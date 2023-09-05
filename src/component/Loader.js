import './Loader.css'

export default function Loader({ showLoader }) {
    return (
        <div id="loaderBox" style={{ display: showLoader ? 'flex' : 'none' }}>
            <div className="loader">
            </div>
        </div>
    )
}