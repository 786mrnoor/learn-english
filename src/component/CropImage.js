import './CropImage.css';
import 'react-image-crop/dist/ReactCrop.css';
import ReactCrop from 'react-image-crop';
import { useRef, useState } from 'react';
const initialVal = {
    width: 0,
    height: 0
}

export default function CropImage({ src, cropShow }) {
    const [crop, setCrop] = useState({
        unit: '%',
        x: 25,
        y: 25,
        width: 50,
        height: 50
    });
    let img = useRef()
    const [cropStyle, setCropStyle] = useState(initialVal);
    function handleImage() {
        let w = img.current.naturalWidth;
        let h = img.current.naturalHeight;
        if (w > h) {
            setCropStyle({
                maxWidth: '100%',
                width: "100%",
                height: "auto"
            })
        }
        else {
            setCropStyle({
                width: "auto",
                height: "100%",
                maxHeight: '100vh'
            })
        }
    }
    console.log(cropStyle);
    return (
        <div className='cropContainer' style={{ display: cropShow ? 'flex' : 'none' }} >
            <ReactCrop crop={crop} onChange={c => setCrop(c)}>
                <img ref={img} src={src} alt="" onLoad={handleImage} />
            </ReactCrop>
        </div>
    )
}