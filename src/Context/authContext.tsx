import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import {
    // createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    sendPasswordResetEmail,
} from "firebase/auth";
import { auth, db } from "../Firebase";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    // setDoc, 
    getDoc,
    getDocs,
    updateDoc,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

// interface createPatientProps {
//     name: string,
//     lastName: string,
//     status: boolean,
//     area: string,
//     chronicDiseases: any,
//     allergies: any,
//     bloodType: string,
//     birthDay: any,
//     age: number,
//     doctorAssigned: string
// }


export const usePatientData = () => {
    const { user } = useAuth();
    // const [patientData, setPatientData] = useState<any>([]);
    const documentId = user.uid;
    const patientCollectionRef = collection(db, 'accounts', documentId, 'patients');
    // const alertsRef = collection()
    const [patientData, setPatientData] = useState<any>([]);
    const [scansData, setScansData] = useState<any>([])

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

            function sweetAlert({ ...filterSigns }) {
                swal({
                    title: "VitaLink last scan",
                    text: `
                       PATIENT FC: ${filterSigns.fc ? filterSigns.fc : "NO DETECTADA"} \n
                       PATIENT SA02: ${filterSigns.spo2 ? filterSigns.spo2 : 'NO DETECTADA'} \n
                       PATIENT TEMPERATURE: ${filterSigns.temp ? filterSigns.temp : 'NO DETECTADA'} \n
                       `,
                    icon: "success"
                });
            }

            sweetAlert({ ...filterSigns })

        } catch (error) {
            console.log(error)
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

            setPatientData(filteredData)
        } catch (err) {
            console.log(err)
        }
    }

    // const getLastPatient = async (patientId: string) => {
    //     const documentId = user.uid;
    //     const patientDocRef = doc(db, 'accounts', documentId, 'patients', patientId);
    
    //     try {
    //         const docSnap = await getDoc(patientDocRef);
    //         if (docSnap.exists()) {
    //             const specificPatientData = { ...docSnap.data(), id: docSnap.id };
    //             console.log('Specific patient data:', specificPatientData);
    //         } else {
    //             console.log('No such document!');
    //         }
    //     } catch (err) {
    //         console.error(err);
    //     }
    // }

    // console.log(patientData)
    // console.log(getLastPatient(patientData))

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

    return { patientData, handleCreatePatient, handleDeletePatient, getVitaLinkSigns, handleUpdatePatient, alerts, vitalinkScans, statusChartPatient}
}


export const useDoctorData = () => {
    const { user } = useAuth();
    const [doctorData, setDoctorData] = useState<any>([]);
    const documentId = user.uid;
    const doctorCollectionRef = collection(db, "accounts", documentId, "doctors");

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
            setDoctorData(filteredData)
            // console.log('doctors data')
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

    return { doctorData, handleCreateDoctor, handleDeleteDoctor, handleUpdateDoctor, statusChartDoctor }
}

export const useAccountData = () => {
    const { user } = useAuth();
    const [accountData, setAccountData] = useState<any>('');

    const getAccountData = async () => {
        try {
            // Assuming you have initialized your Firestore database connection
            const accountsCollectionRef = collection(db, 'accounts');
            const documentId = user.uid;

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

    useEffect(() => {
        getAccountData();
    }, [user.uid]);

    return { accountData };
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
