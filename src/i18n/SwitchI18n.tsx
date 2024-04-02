import { Switch } from "@nextui-org/react";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export function SwitchI18n() {
    const [isSelected, setIsSelected] = useState(false);
    const [t, i18n] = useTranslation("global");

    const handleChangeLenguage = (option: boolean) => {
        setIsSelected(option)
        const lenguage = option ? 'es' : 'en';
        i18n.changeLanguage(lenguage)
    }


    return (
        <>
            <Switch
                defaultSelected
                size="lg"
                color="warning"
                isSelected={isSelected}
                onValueChange={handleChangeLenguage}
                thumbIcon={({ isSelected, className }) =>
                    isSelected ? (
                        <img src="https://flagcdn.com/16x12/es.png" className={className} />
                    ) : (
                        <img src="https://flagcdn.com/16x12/us.png" className={className} />
                    )
                }
            >
                <p className="text-small text-default-500">{isSelected ? t("b-switch.spanish") : "EN"}</p>
            </Switch>
        </>
    )
} 