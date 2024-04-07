import { createContext, useContext, useEffect, useState, ReactNode, useMemo } from "react";
import {
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db, storage } from "../Firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    setDoc,
    updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
import { deleteObject, getDownloadURL, listAll, ref, uploadBytes } from "firebase/storage";
import { useTranslation } from "react-i18next";
import { Column, Id, Task } from "../Components/Dashboard/Kanban/Types";
import { v4 } from "uuid";
import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent, DragOverEvent, DragStartEvent } from "@dnd-kit/core";


export const useNotes = () => {
    const { user } = useAuth()
    const documentId = user.uid;
    const notesRef = collection(db, 'accounts', documentId, 'notes')

    const [allCols, setAllCols] = useState<Column[]>([])
    const [allTasks, setAllTasks] = useState<Task[]>([])
    const [KanbanBoardId, setKanbanBoardId] = useState('')

    const [columns, setColumns] = useState<Column[]>(allCols);
    const [tasks, setTasks] = useState<Task[]>(allTasks);
    const [activeColumn, setActiveColumn] = useState<Column | null>(null);
    const [activeTask, setActiveTask] = useState<Task | null>(null);

    const columnsId = useMemo(() => columns?.map(col => col.id) || [], [columns]);

    const createTask = async (columnId: Id) => {
        const taskId = generateId();
        const newTask: Task = {
            id: taskId,
            columnId,
            content: `Task ${tasks.length + 1}`,
        };

        try {
            setTasks([...tasks, newTask]);

            const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const kanbanBoardData = docSnap.data();
                const updatedTasks = kanbanBoardData.AllTasks ? [...kanbanBoardData.AllTasks, newTask] : [newTask];

                await updateDoc(docRef, { AllTasks: updatedTasks });

            } else {
                await setDoc(docRef, { AllTasks: [newTask], AllCols: [] }); // Create new document with initial task
            }
        } catch (error) {
            console.error('Error adding new task: ', error);
        }
    }


    const deleteTask = async (id: Id) => {
        try {
            // Delete the task from the local state
            const newTasks = tasks.filter((task) => task.id !== id);
            setTasks(newTasks);

            // Update the AllTasks field in the Firestore database
            const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                // Remove the deleted task from the AllTasks array
                const kanbanBoardData = docSnap.data();
                const updatedTasks = kanbanBoardData.AllTasks.filter((task: Task) => task.id !== id);

                // Update the AllTasks field in the KanbanBoard document
                await updateDoc(docRef, { AllTasks: updatedTasks });
                // console.log('Task deleted successfully.');
            } else {
                console.error('KanbanBoard document does not exist.');
            }
        } catch (error) {
            console.error('Error deleting task: ', error);
        }
    }

    const updateTask = async (id: Id, content: string) => {
        try {
            // Update the local state with the new content for the specific task
            const newTasks = tasks.map((task) => {
                if (task.id !== id) return task;
                return { ...task, content };
            });
            setTasks(newTasks);

            // Update the AllTasks field in the Firestore database
            const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const kanbanBoardData = docSnap.data();
                const updatedTasks = kanbanBoardData.AllTasks.map((task: Task) => {
                    if (task.id !== id) return task;
                    return { ...task, content };
                });

                // Update the AllTasks field in the KanbanBoard document
                await updateDoc(docRef, { AllTasks: updatedTasks });
                // console.log('Task content updated successfully.');
            } else {
                console.error('KanbanBoard document does not exist.');
            }
        } catch (error) {
            console.error('Error updating task content: ', error);
        }
    }


    const createNewColumn = async () => {
        const columnToAdd: Column = {
            id: generateId(),
            title: `Column ${columns.length + 1}`,
        };

        try {
            const docRefAdd = collection(db, 'accounts', documentId, 'notes');
            const docRefSet = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
            const docSnap = await getDoc(docRefSet);
            if (docSnap.exists()) {
                const kanbanBoardData = docSnap.data();
                const updatedCols = kanbanBoardData.AllCols ? [...kanbanBoardData.AllCols, columnToAdd] : [columnToAdd];

                await updateDoc(docRefSet, { AllCols: updatedCols });
                setColumns([...columns, columnToAdd]);
            } else {
                await addDoc(docRefAdd, { AllCols: [], AllTasks: [] })
                await setDoc(docRefSet, { AllCols: [columnToAdd], AllTasks: [] }); // Create new document with initial column
            }
        } catch (error) {
            console.error('Error adding new column: ', error);
        }
    }

    const deleteColumn = async (id: Id) => {
        try {
            // Delete the column and associated tasks from the local state
            const filteredColumns = columns.filter((col) => col.id !== id);
            setColumns(filteredColumns);

            const newTasks = tasks.filter((t) => t.columnId !== id);
            setTasks(newTasks);

            // Update the AllCols and associated tasks in the Firestore database
            const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const kanbanBoardData = docSnap.data();

                // Filter out the deleted column from AllCols
                const updatedCols = kanbanBoardData.AllCols.filter((col: Column) => col.id !== id);
                const updatedTasks = kanbanBoardData.AllTasks.filter((task: Task) => task.columnId !== id);

                // Update the AllCols and AllTasks fields in the KanbanBoard document
                await updateDoc(docRef, { AllCols: updatedCols, AllTasks: updatedTasks });
                // console.log('Column and associated tasks deleted successfully.');
            } else {
                console.error('KanbanBoard document does not exist.');
            }
        } catch (error) {
            console.error('Error deleting column: ', error);
        }
    }

    const updateColumn = async (id: Id, title: string) => {
        try {
            // Update the local state with the new title for the specific column
            const newColumns = columns.map((col) => {
                if (col.id !== id) return col;
                return { ...col, title };
            });
            setColumns(newColumns);

            // Update the AllCols field in the Firestore database
            const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const kanbanBoardData = docSnap.data();
                const updatedCols = kanbanBoardData.AllCols.map((col: Column) => {
                    if (col.id !== id) return col;
                    return { ...col, title };
                });

                // Update the AllCols field in the KanbanBoard document
                await updateDoc(docRef, { AllCols: updatedCols });
                // console.log('Column title updated successfully.');
            } else {
                console.error('KanbanBoard document does not exist.');
            }
        } catch (error) {
            console.error('Error updating column title: ', error);
        }
    }

    function onDragStart(event: DragStartEvent) {
        if (event.active.data.current?.type === "Column") {
            setActiveColumn(event.active.data.current.column);
            return;
        }

        if (event.active.data.current?.type === "Task") {
            setActiveTask(event.active.data.current.task);
            return;
        }
    }

    function onDragEnd(event: DragEndEvent) {
        // Reset the active item
        setActiveColumn(null);
        setActiveTask(null);

        const { active, over } = event;
        // Early return if there's no 'over' target or if the item is dropped onto itself
        if (!over || active.id === over.id) return;

        // Handle Column reordering if applicable
        if (active.data.current?.type === "Column") {
            const updatedColumns = arrayMove(
                columns,
                columns.findIndex((col) => col.id === active.id),
                columns.findIndex((col) => col.id === over.id)
            );
            setColumns(updatedColumns);
            updateColumnPositions(updatedColumns); // Updates column positions in Firestore
            return;
        }

        // Extract the target column's ID more flexibly
        let targetColumnId;
        if (over.data.current?.type === "Column") {
            targetColumnId = over.id;
        } else if (over.data.current?.type === "Task") {
            const targetTask = tasks.find(task => task.id === over.id);
            targetColumnId = targetTask ? targetTask.columnId : undefined;
        }

        if (targetColumnId) {
            handleTaskReorderingAndMoving(active.id, targetColumnId);
        }
    }


    async function handleTaskReorderingAndMoving(draggedId: any, targetColumnId: any) {
        const draggedTask = tasks.find(task => task.id === draggedId);

        // Return early if the draggedTask is undefined
        if (!draggedTask) return;

        let updatedTasks = [...tasks];
        if (draggedTask.columnId !== targetColumnId) {
            // Simply move task to new column if different from the current one
            updatedTasks = updatedTasks.map(task =>
                task.id === draggedId ? { ...task, columnId: targetColumnId } : task
            );
        }

        setTasks(updatedTasks);
        await updateTaskPositions(updatedTasks); // Updates tasks positions and columns in Firestore
    }


    function onDragOver(event: DragOverEvent) {
        const { active, over } = event;
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        if (activeId === overId) return;

        const isActiveATask = active.data.current?.type === "Task";
        const isOverATask = over.data.current?.type === "Task";

        if (!isActiveATask || !isOverATask) return;

        setTasks((tasks) => {
            const activeIndex = tasks.findIndex((t) => t.id === activeId);
            const overIndex = tasks.findIndex((t) => t.id === overId);

            let updatedTasks: Task[];

            if (tasks[activeIndex].columnId !== tasks[overIndex].columnId) {
                tasks[activeIndex].columnId = tasks[overIndex].columnId;
                updatedTasks = arrayMove(tasks, activeIndex, overIndex - 1);
            } else {
                updatedTasks = arrayMove(tasks, activeIndex, overIndex);
            }

            return updatedTasks;
        });

        const updatedTasks = tasks;

        // Update the positions of the tasks in the Firestore database
        updateTaskPositions(updatedTasks);
    }

    async function updateColumnPositions(updatedColumns: Column[]) {
        const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
        await updateDoc(docRef, { AllCols: updatedColumns });
    }

    async function updateTaskPositions(updatedTasks: Task[]) {
        const docRef = doc(db, 'accounts', documentId, 'notes', KanbanBoardId);
        await updateDoc(docRef, { AllTasks: updatedTasks });
    }

    function generateId() {
        return v4();
    }


    const getNotes = async () => {
        try {
            const data = await getDocs(notesRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }) as any);
            setAllCols(filteredData[0].AllCols);
            setAllTasks(filteredData[0].AllTasks);
            setKanbanBoardId(filteredData[0].id)
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        if (allCols && allTasks) {
            setColumns(allCols);
            setTasks(allTasks);
        }
    }, [allCols, allTasks]);

    return {
        allCols,
        allTasks,
        KanbanBoardId,
        getNotes,
        updateColumn,
        columnsId,
        deleteColumn,
        createNewColumn,
        createTask,
        deleteTask,
        updateTask,
        onDragEnd,
        onDragOver,
        onDragStart,
        activeColumn,
        activeTask,
        columns,
        tasks
    }
}


export const useFileStorage = () => {
    const [docsStorageList, setDocsStorageList] = useState<any>([])
    const [imgProfileList, setImgProfileList] = useState<any>([])
    const fileRefStorage = ref(storage, `files/`)
    const imgRefProfile = ref(storage, `profile/`)

    const uploadToStorage = async (imgToUpload: any) => {
        const fileRef = ref(storage, `files/${imgToUpload[0].name}`)

        try {
            await uploadBytes(fileRef, imgToUpload[0])
            getStorageFiles()
        } catch (error) {
            console.log(error)
        }
    }

    const deleteStorageFile = async (fileName: string) => {
        const fileRef = ref(storage, `files/${fileName}`)

        try {
            await deleteObject(fileRef)
            getStorageFiles()
        } catch (error) {
            console.log(error)
        }
    }

    const uploadImageToProfile = async (imgToUpload: any) => {
        const imgRef = ref(storage, `profile/${imgToUpload[0].name}`)

        try {
            await uploadBytes(imgRef, imgToUpload[0])
            getProfileFiles()
        } catch (error) {
            console.log(error)
        }
    }

    const getStorageFiles = async () => {
        try {
            const data = await listAll(fileRefStorage);

            const urls = await Promise.all(data.items.map(async (item) => {
                const url = await getDownloadURL(item)
                return { url: url, name: item.name, bucket: item.bucket }
            }));

            setDocsStorageList(urls);

        } catch (error) {
            console.log(error);
        }
    }

    const deleteProfileImg = async (fileName: string) => {
        const fileRef = ref(storage, `profile/${fileName}`)

        try {
            await deleteObject(fileRef)
            getProfileFiles()
        } catch (error) {
            console.log(error)
        }
    }

    const getProfileFiles = async () => {
        try {
            const data = await listAll(imgRefProfile);

            const urls = await Promise.all(data.items.map(async (item) => {
                const url = await getDownloadURL(item)
                return { url: url, name: item.name }
            }));

            setImgProfileList(urls);

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getStorageFiles()
        getProfileFiles()
    }, [])

    return {
        uploadToStorage,
        uploadImageToProfile,
        docsStorageList,
        imgProfileList,
        deleteStorageFile,
        deleteProfileImg,
    }
}

export const useEventCalendar = () => {
    const { user } = useAuth()
    const documentId = user.uid;
    const eventsCollectionRef = collection(db, 'accounts', documentId, 'events')
    const [calendarEvents, setCalendarEvents] = useState<any>('')
    // const [signsEvents, setSignsEvents] = useState<any>('')
    // const [events, setEvents] = useState<any>([]);

    // interface eventsProps {
    //     id: string,
    //     dateTime: string,
    //     temp: number,
    //     spo2: number,
    //     fc: number
    // }

    // const getVitalinkSignsEvents = async () => {
    // let testeo = [{start: dayjs('2024-03-26T22:37').toDate(), end: dayjs('2024-03-26T22:37').toDate(), title: 'Hola',}]
    // let test = []
    // const vitaLinkSignsCollectionRef = collection(db, 'accounts', documentId, 'patients', testUser, 'vitalSigns')
    // const data = await getDocs(vitaLinkSignsCollectionRef)
    // const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as eventsProps))
    // setSignsEvents(filteredData)

    // let r = 0
    // while (r < filteredData.length) {
    //     test.push(
    //         {
    //             start: filteredData[r].dateTime,
    //             end: filteredData[r].dateTime,
    //             title: filteredData[r].dateTime
    //         }
    //     )

    //     r++
    // }
    // }

    // const loadEvents = async () => {
    //     try {
    //         const obtainedEvents = await getVitalinkSignsEvents();
    //         setEvents(obtainedEvents);
    //     } catch (error) {
    //         console.log(error)
    //     }
    //   };

    // console.log(getVitalinkSignsEvents())

    const getEvents = async () => {
        try {
            const data = await getDocs(eventsCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setCalendarEvents(filteredData)
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getEvents()
        // getVitalinkSignsEvents()
    }, [])

    const handleCreateEvent = async (addStart: string, addEnd: string, addTitle: string) => {
        try {
            await addDoc(eventsCollectionRef, {
                start: addStart,
                end: addEnd,
                title: addTitle
            })
            getEvents()
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeleteEvent = async (id: string) => {
        const eventRef = doc(db, 'accounts', documentId, 'events', id)
        try {
            await deleteDoc(eventRef)
            getEvents()
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateEvent = async (id: string, newStart: string, newEnd: string, newTitle: string) => {
        const eventRef = doc(db, 'accounts', documentId, 'events', id)

        try {
            await updateDoc(eventRef, {
                start: newStart,
                end: newEnd,
                title: newTitle
            })
            getEvents()
        } catch (error) {
            console.log(error)
        }
    }

    return {
        calendarEvents,
        handleCreateEvent,
        handleDeleteEvent,
        handleUpdateEvent,
    }
}



export const usePatientData = () => {
    const [t] = useTranslation("global")
    const { user } = useAuth();
    // const [patientData, setPatientData] = useState<any>([]);
    const documentId = user.uid;
    const patientCollectionRef = collection(db, 'accounts', documentId, 'patients');
    // const alertsRef = collection()
    const [patientData, setPatientData] = useState<any>([]);
    const [scansData, setScansData] = useState<any>([])
    const [lastPatientName, setLastPatientName] = useState('')
    const [lastPatientLastName, setLastPatientLastName] = useState('')

    interface lastPatient {
        id: string
        name: string
        lastName: string
        createdAt: any
    }

    const getElderlyPatients = () => {
        let i = 0
        let countElderlyPatients = 0
        while (i < patientData.length) {
            if (patientData[i].age >= 70) {
                countElderlyPatients++
            }
            i++
        }
        return countElderlyPatients
    }

    const getMostCommonBloodType = () => {
        const bloodTypeCounts: any = {}; // Object to store blood type counts

        // Iterate through patient data to count blood types
        for (let i = 0; i < patientData.length; i++) {
            const bloodType = patientData[i].bloodType;
            bloodTypeCounts[bloodType] = (bloodTypeCounts[bloodType] || 0) + 1;
        }

        let mostCommonBloodType = '';
        let maxCount = 0;

        // Find the most common blood type
        for (const bloodType in bloodTypeCounts) {
            if (bloodTypeCounts[bloodType] > maxCount) {
                mostCommonBloodType = bloodType;
                maxCount = bloodTypeCounts[bloodType];
            }
        }

        return mostCommonBloodType;
    }

    const getUnderAgePatients = () => {
        let i = 0
        let countUnderagePatients = 0
        while (i < patientData.length) {
            if (patientData[i].age <= 18) {
                countUnderagePatients++
            }
            i++
        }
        return countUnderagePatients
    }

    const alerts = () => {
        let countCriticals = 0;
        for (let i = 0; i < patientData.length; i++) {
            if (patientData[i].status === 'Critical') {
                countCriticals++
            }
        }
        return countCriticals
    }

    const statusChartPatient = () => {
        let arrFinal = []
        let countStable = 0
        let countUnstable = 0
        let countImproving = 0
        let countCritical = 0
        let countRecovering = 0
        let countSerious = 0
        let countGuarded = 0
        for (let i = 0; i < patientData.length; i++) {
            switch (patientData[i].status) {
                case 'Stable':
                    countStable++
                    break;
                case 'Unstable':
                    countUnstable++
                    break;
                case 'Improving':
                    countImproving++
                    break;
                case 'Critical':
                    countCritical++
                    break;
                case 'Recovering':
                    countRecovering++
                    break;
                case 'Serious':
                    countSerious++
                    break;
                case 'Guarded':
                    countGuarded++
                    break;
                default:
                    break;
            }
        }
        arrFinal = [countStable, countUnstable, countImproving, countCritical, countRecovering, countSerious, countGuarded]
        return arrFinal
    }

    const vitalinkScans = () => {
        let i = 0
        while (i < scansData.length) {
            i++
        }
        return i
    }

    const getVitalinkScans = async () => {
        const vitaLinkSignsCollectionRef = collection(db, 'accounts', documentId, 'patients', '8MVgcYw7Zv7oZfQVkLF9', 'vitalSigns')

        try {
            const totalScansData = await getDocs(vitaLinkSignsCollectionRef)
            const filteredData = totalScansData.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setScansData(filteredData)
        } catch (err) {
            console.log(err)
        }
    }

    const getVitaLinkSigns = async (id: any) => {
        const vitaLinkSignsCollectionRef = collection(db, 'accounts', documentId, 'patients', id, 'vitalSigns')

        try {
            const data = await getDocs(vitaLinkSignsCollectionRef)
            const filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const filterSigns = filterData[filterData.length - 1]

            // console.log(filterSigns)

            function sweetAlert({ ...filterSigns }) {
                swal({
                    title: `${t("d-personal.patients.scan.title")}`,
                    text: `
                    ${t("d-personal.patients.scan.item1")} \xa0 ${filterSigns.dateTime ? filterSigns.dateTime : t("d-personal.patients.scan.no")} \n
                    ${t("d-personal.patients.scan.item2")} \xa0 ${filterSigns.fc ? filterSigns.fc : t("d-personal.patients.scan.no")} \n
                    ${t("d-personal.patients.scan.item3")} \xa0 ${filterSigns.spo2 ? filterSigns.spo2 : t("d-personal.patients.scan.no")} \n
                    ${t("d-personal.patients.scan.item4")} \xa0 ${filterSigns.temp ? filterSigns.temp : t("d-personal.patients.scan.no")} \n
                               
                       `,
                    icon: "success"
                });
            }

            sweetAlert({ ...filterSigns })

        } catch (error) {
            console.log(error)
        }
    }

    interface SignsProps {
        id: string,
        temp: number,
        spo2: number,
        fc: number
    }


    const getSignsAlert = async () => {
        for (let i = 0; i < patientData.length; i++) {
            let userID = await patientData[i].id;
            let userName = await patientData[i].name
            let lastName = await patientData[i].lastName
            let area = await patientData[i].area
            let docAssigned = await patientData[i].doctorAssigned

            let vitaLinkSignsCollectionRef = collection(db, 'accounts', documentId, 'patients', userID, 'vitalSigns')

            try {
                let data = await getDocs(vitaLinkSignsCollectionRef)
                let filterData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id } as SignsProps));
                let filterSigns = filterData[filterData.length - 1]

                let userFc = filterSigns.fc
                let userTemp = filterSigns.temp
                let userSpo2 = filterSigns.spo2

                const sweetAlert = (type: string, res: number) => {
                    swal({
                        title: `${type} ${res}`,
                        text: `
                        PATIENT NAME: \xa0 ${userName} ${lastName} \n
                        ACTUAL LOCATION: \xa0 ${area} \n   
                        PATIENT FC: \xa0 ${userFc} \n
                        PATIENT TEMP: \xa0 ${userTemp} \n 
                        PATIENT SPO2: \xa0 ${userSpo2} \n                                                              
                               DOCTOR ASSIGNED: \xa0 ${docAssigned}  \n                                                            
                               `,
                        icon: "warning"
                    });
                }

                switch (true) {
                    case (userFc < 60):
                        sweetAlert('LOW FC: ', userFc)
                        break;
                    case (userFc > 100):
                        sweetAlert('HIGH FC: ', userFc)
                        break;
                    default:
                        // console.log('FC FINE')
                        break;
                }

                switch (true) {
                    case (userTemp < 24):
                        sweetAlert('LOW TEMP: ', userTemp)
                        break;
                    case (userTemp > 36):
                        sweetAlert('HIGH TEMP: ', userTemp)
                        break;
                    default:
                        // console.log('TEMP FINE')
                        break;
                }

                switch (true) {
                    case (userSpo2 < 95):
                        sweetAlert('LOW SPO2: ', userSpo2)
                        break;

                    default:
                        // console.log('SPO2 FINE')
                        break;
                }


            } catch (error) {
                console.log(error)
            }
        }
    }


    // ACCIONES PARA EL CRUD
    const handleCreatePatient = async (newName: string, newLastName: string, newStatus: string, newArea: string, newChronicDiseases: string[], newAllergies: string[], newBloodType: string, newBirthDate: string, newAge: number, newDoctorAssigned: string) => {
        try {
            await addDoc(patientCollectionRef, {
                name: newName,
                lastName: newLastName,
                status: newStatus,
                area: newArea,
                chronicDiseases: newChronicDiseases,
                allergies: newAllergies,
                bloodType: newBloodType,
                birthDate: newBirthDate,
                age: newAge,
                doctorAssigned: newDoctorAssigned
            })
            secureDelay()
        } catch (err) {
            console.log(err)
        }
    }

    const handleDeletePatient = async (id: string) => {
        const deletePatientRef = doc(db, 'accounts', documentId, 'patients', id);

        try {
            await deleteDoc(deletePatientRef)
            getPatientData()
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdatePatient = async (id: string, newName: string, newLastName: string, newStatus: string, newArea: string, newChronicDiseases: string[], newAllergies: string[], newBloodType: string, newBirthDate: string, newAge: number, newDoctorAssigned: string) => {
        const updatePatientRef = doc(db, 'accounts', documentId, 'patients', id);

        await updateDoc(updatePatientRef, {
            name: newName,
            lastName: newLastName,
            status: newStatus,
            area: newArea,
            chronicDiseases: newChronicDiseases,
            allergies: newAllergies,
            bloodType: newBloodType,
            birthDate: newBirthDate,
            age: newAge,
            doctorAssigned: newDoctorAssigned
        })
        //   console.log(id)
        secureDelay()
    }


    const getPatientData = async () => {
        const documentId = user.uid;
        const patientCollectionRef = collection(db, 'accounts', documentId, 'patients');

        try {
            const data = await getDocs(patientCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            const lastLength = filteredData.length - 1
            const lastPatientId = (filteredData[lastLength].id)
            const lastPatientDocRef = doc(db, 'accounts', documentId, 'patients', lastPatientId);
            const docSnap = await getDoc(lastPatientDocRef);

            if (docSnap.exists()) {
                const specificPatientData = { ...docSnap.data(), id: docSnap.id } as lastPatient;
                setLastPatientName(specificPatientData.name)
                setLastPatientLastName(specificPatientData.lastName)
            } else {
                console.log('No such document!');
            }

            setPatientData(filteredData)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getPatientData()
        getVitalinkScans()
    }, [])

    const secureDelay = async () => {
        setTimeout(() => {
            // getPatientData()
            // console.log('asd')
            window.location.reload()
        }, 0)
    }

    return {
        patientData,
        handleCreatePatient,
        handleDeletePatient,
        getVitaLinkSigns,
        handleUpdatePatient,
        alerts,
        vitalinkScans,
        statusChartPatient,
        lastPatientLastName,
        lastPatientName,
        getElderlyPatients,
        getUnderAgePatients,
        getMostCommonBloodType,
        getSignsAlert
    }
}


export const useDoctorData = () => {
    const { user } = useAuth();
    const [doctorData, setDoctorData] = useState<any>([]);
    const documentId = user.uid;
    const doctorCollectionRef = collection(db, "accounts", documentId, "doctors");
    const [lastDoctorName, setLastDoctorName] = useState('')
    const [lastDoctorLastName, setLastDoctorLastName] = useState('')

    interface lastDoctor {
        id: string
        name: string
        lastName: string
    }

    const statusChartDoctor = () => {
        let arrFinal = []
        let countOnCall = 0
        let countAway = 0
        let countAvailable = 0
        let countNotAvailable = 0
        for (let i = 0; i < doctorData.length; i++) {
            switch (doctorData[i].status) {
                case 'On Call':
                    countOnCall++
                    break;
                case 'Away':
                    countAway++
                    break;
                case 'Available':
                    countAvailable++
                    break;
                case 'Not Available':
                    countNotAvailable++
                    break;
                default:
                    break;
            }
        }
        arrFinal = [countOnCall, countAway, countAvailable, countNotAvailable]
        return arrFinal
    }

    const handleCreateDoctor = async (newName: string, newLastName: string, newArea: string, newNumCedula: number, newPatients: string[], newStatus: string) => {
        try {
            await addDoc(doctorCollectionRef, {
                name: newName,
                lastName: newLastName,
                area: newArea,
                numCedula: newNumCedula,
                patients: newPatients,
                status: newStatus
            })
            secureDelay()
        } catch (err) {
            console.log(err)
        }
        // } finally {
        //     getDoctorData()
        // }
    }

    const handleDeleteDoctor = async (id: string) => {
        const deleteDoctor = doc(db, 'accounts', documentId, 'doctors', id)
        try {
            await deleteDoc(deleteDoctor)
            getDoctorData()
        } catch (err) {
            console.log(err)
        }
    }

    const handleUpdateDoctor = async (id: string, newName: string, newLastName: string, newArea: string, newNumCedula: number, newPatients: string[], newStatus: string) => {
        const updateDoctorRef = doc(db, 'accounts', documentId, 'doctors', id);

        try {
            await updateDoc(updateDoctorRef, {
                name: newName,
                lastName: newLastName,
                area: newArea,
                numCedula: newNumCedula,
                patients: newPatients,
                status: newStatus
            })
            secureDelay()
        } catch (err) {
            console.log(err)
        }
    }

    const getDoctorData = async () => {

        try {
            const data = await getDocs(doctorCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

            const lastLength = filteredData.length - 1
            const lastDoctorId = (filteredData[lastLength].id)
            const lastPatientDocRef = doc(db, "accounts", documentId, "doctors", lastDoctorId);
            const docSnap = await getDoc(lastPatientDocRef);

            if (docSnap.exists()) {
                const specificPatientData = { ...docSnap.data(), id: docSnap.id } as lastDoctor;
                setLastDoctorName(specificPatientData.name)
                setLastDoctorLastName(specificPatientData.lastName)
            } else {
                console.log('No such document!');
            }

            setDoctorData(filteredData)
        } catch (err) {
            console.log(err)
        }
    }


    useEffect(() => {
        getDoctorData()
    }, [])

    const secureDelay = async () => {
        setTimeout(() => {
            // getDoctorData()
            // console.log('asd')
            window.location.reload()
        }, 0)
    }

    return { doctorData, handleCreateDoctor, handleDeleteDoctor, handleUpdateDoctor, statusChartDoctor, lastDoctorName, lastDoctorLastName }
}

export const useAccountData = () => {
    const { user } = useAuth();
    const [accountData, setAccountData] = useState<any>('');
    const accountsCollectionRef = collection(db, 'accounts');
    const documentId = user.uid;
    const updateaccountRef = doc(db, 'accounts', documentId)

    const getAccountData = async () => {
        try {
            const docSnap = await getDoc(doc(accountsCollectionRef, documentId));
            if (docSnap.exists()) {
                const accountInfo = docSnap.data();
                setAccountData(accountInfo);
            } else {
                console.log('No such Document');
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleUpdateEmail = async (newEmail: string) => {
        try {
            await updateDoc(updateaccountRef, {
                email: newEmail
            })
            secureDelay();
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdateUserName = async (newUserName: string) => {
        try {
            await updateDoc(updateaccountRef, {
                userName: newUserName
            })
            secureDelay();
        } catch (error) {
            console.log(error)
        }
    }

    const handleUpdatePhotoProfile = async (newProfilePhoto: string) => {
        try {
            await updateDoc(updateaccountRef, {
                profilePhoto: newProfilePhoto
            })
            secureDelay();
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getAccountData();
    }, [user.uid]);

    const secureDelay = async () => {
        setTimeout(() => {
            // getDoctorData()
            // console.log('asd')
            window.location.reload()
        }, 0)
    }

    return {
        accountData,
        handleUpdateEmail,
        handleUpdateUserName,
        handleUpdatePhotoProfile
    };
};

interface AuthContextProps {
    // signUp: (email: string, password: string) => void;
    login: (email: string, password: string) => void;
    logOut: () => void;
    // loginWithGoogle: () => void;
    resetPassword: (email: string) => void;
    user: any;
    loading: boolean;
}

const authContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = (): AuthContextProps => {
    const context = useContext(authContext);
    if (!context) throw new Error("There is no auth provider");
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): JSX.Element {
    const navigate = useNavigate();
    const [user, setUser] = useState<any>();
    const [loading, setLoading] = useState(true);


    // const signUp = (email: string, password: string): void => {
    //     createUserWithEmailAndPassword(auth, email, password)
    //         .then((creds) =>
    //             setDoc(doc(db, "users", creds.user.uid), { rol: "user" })
    //         )
    //         .then(() => navigate("/Dashboard"));
    // };

    const login = async (email: string, password: string): Promise<void> => {
        signInWithEmailAndPassword(auth, email, password)
            .then((creds) => {
                getDoc(doc(db, "accounts", creds.user.uid)).then((docSnap) => {
                    if (docSnap.exists()) {
                        switch (docSnap.data().rol) {
                            case "personal":
                                navigate("/AdminView");
                                break;
                            case "hospital":
                                navigate("/dashboard/home");
                                break;
                        }
                    }
                });
            });
    };

    const logOut = async (): Promise<void> => {
        await signOut(auth);
        navigate("/")
    };


    // const loginWithGoogle = (): void => {
    //     const googleProvider = new GoogleAuthProvider();
    //     signInWithPopup(auth, googleProvider);
    // };


    const resetPassword = async (email: string): Promise<void> => {
        try {
            // Espera a que la promesa se resuelva antes de continuar
            await sendPasswordResetEmail(auth, email);

            console.log(`Correo de restablecimiento de contraseña enviado a ${email}`);
        } catch (error: any) {
            // Proporciona un tipo explícito para 'error'
            console.error(`Error al enviar el correo de restablecimiento de contraseña: ${error.message}`);
        }
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
            // console.log(currentUser?.uid)
        });

        return () => unsubscribe();
    }, []);

    const contextValue: AuthContextProps = {
        // signUp,
        login,
        logOut,
        resetPassword,
        user,
        loading,
    };

    return (
        <authContext.Provider value={contextValue}>{children}</authContext.Provider>
    );

}
