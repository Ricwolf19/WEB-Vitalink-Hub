import { useTranslation } from "react-i18next";

export function Footer() {
    const [t] = useTranslation("global");
    
    return (
        <>
        <br />
        <div className="bg-blue-700 text-xs text-white text-center p-4 font-semibold">
        {t("s-footer.text")}
        </div>
        </>
    )
}