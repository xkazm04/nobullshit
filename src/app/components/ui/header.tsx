import Header from "../Header";

const HeaderComponent = ({ page }) => {
    return <>
        <div className='absolute z-10 w-full'>
            <div className="flex flex-row">
                <Header />
                <div className="title-menu pt-6">{page}</div>
            </div>
        </div>
    </>
}

export default HeaderComponent;