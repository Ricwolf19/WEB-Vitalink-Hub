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
    const patientCollectionRef = collection(db, 'accounts', documentId, 'patients')
    const [patientData, setPatientData] = useState<any>([]);



    const getVitaLinkSigns = async (id: any) => {
        const vitaLinkSignsCollectionRef = collection(db, 'accounts', documentId, 'patients', id, 'vitalSigns')

        try {
            const data = await getDocs(vitaLinkSignsCollectionRef)
            const filtereData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            const filterSigns = filtereData[0]
            // console.log(filterSigns)

            function sweetAlert({ ...filterSigns }) {
                swal({
                    title: "VitaLink last scan ",
                    text: `
                       PATIENT FC: ${filterSigns.fc} \n
                       PATIENT SA02: ${filterSigns.sa02} \n
                       PATIENT TEMPERATURE: ${filterSigns.temp} \n
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
        const patientCollectionRef = collection(db, 'accounts', documentId, 'patients')

        try {
            const data = await getDocs(patientCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
            setPatientData(filteredData)
            // console.log('patients data')
        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        getPatientData()
    }, [])

    const secureDelay = async () => {
        setTimeout(() => {
            // getPatientData()
            // console.log('asd')
            window.location.reload()
        }, 0)
    }

    return { patientData, handleCreatePatient, handleDeletePatient, getVitaLinkSigns, handleUpdatePatient }
}



export const useDoctorData = () => {
    const { user } = useAuth();
    const [doctorData, setDoctorData] = useState<any>([]);
    const documentId = user.uid;
    const doctorCollectionRef = collection(db, "accounts", documentId, "doctors");

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

    return { doctorData, handleCreateDoctor, handleDeleteDoctor, handleUpdateDoctor }
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
