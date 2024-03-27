import { useFileStorage } from "../../Context/authContext"

export function Documents() {
    const { imgBgList, imgProfileList } = useFileStorage()

    return (
        <>
            <h1>Document Storage Section</h1>

            <br />

            <div>
            <h1>Profile Photos</h1>
            {imgProfileList.map((url: any) => {
                return <img src={url} key={url} />
            })}
            </div>            

            <br /> <br /> <br />

            <div>
            <h1>Background Photos</h1>
            {imgBgList.map((url: any) => {
                return <img src={url} key={url} />
            })}
            </div>    
        </>
    )
}