import React, { useEffect, useRef, useState } from 'react';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ChromePicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const Canva = () => {
    const data = {
        "caption": {
            "text": "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
            "position": { "x": 50, "y": 50 },
            "max_characters_per_line": 31,
            "font_size": 44,
            "alignment": "left",
            "text_color": "#FFFFFF"
        },
        "cta": {
            "text": "Shop Now",
            "position": { "x": 190, "y": 320 },
            "text_color": "#FFFFFF",
            "background_color": "#000000"
        },
        "image_mask": {
            "x": 56,
            "y": 442,
            "width": 970,
            "height": 600
        },
        "urls": {
            "mask": "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png?random=12345",
            "stroke": "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png?random=12345",
            "design_pattern": "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png?random=12345"
        }

    };

    const defaultImage = "https://copilot.microsoft.com/images/blob?bcid=r5D1o2fbOfcG2g";

    const [caption, setCaption] = useState(data.caption.text);
    const [ctaText, setCtaText] = useState(data.cta.text);
    const [recentColors, setRecentColors] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState('#0369A1');
    const [showPicker, setShowPicker] = useState(false);
    const [selectedImage, setSelectedImage] = useState(defaultImage);
    const [loading, setLoading] = useState(false);
    const canvasRef = useRef(null);

    const wrapText = (context, text, x, y, maxCharactersPerLine) => {
        let words = text.split(' ');
        let line = '';
        let lineHeight = data.caption.font_size;
        let lines = 1;
        const maxWidth = maxCharactersPerLine * (data.caption.font_size * 0.6);

        for (let n = 0; n < words.length; n++) {
            let testLine = line + words[n] + ' ';
            let metrics = context.measureText(testLine);
            let testWidth = metrics.width;
            if (testWidth > maxWidth && n > 0) {
                context.fillText(line, x, y + (lines - 1) * lineHeight);
                line = words[n] + ' ';
                lines++;
            } else {
                line = testLine;
            }
        }
        context.fillText(line, x, y + (lines - 1) * lineHeight);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const designPatternImg = new Image();
        designPatternImg.src = data.urls.design_pattern;
        designPatternImg.onload = () => {
            ctx.drawImage(designPatternImg, 0, 0);
        };

        const maskImg = new Image();
        maskImg.src = data.urls.mask;
        maskImg.onload = () => {
            ctx.drawImage(maskImg, data.image_mask.x, data.image_mask.y, data.image_mask.width, data.image_mask.height);
        }

        const maskStrokeImg = new Image();
        maskStrokeImg.src = data.urls.stroke;
        maskStrokeImg.onload = () => {
            ctx.drawImage(maskStrokeImg, data.image_mask.x, data.image_mask.y)
        }

        const image = new Image();
        image.src = selectedImage;
        image.onload = () => {
            ctx.drawImage(image, data.image_mask.x , data.image_mask.y , data.image_mask.width , data.image_mask.height );
        }

        ctx.fillStyle = data.caption.text_color;
        ctx.font = `${data.caption.font_size}px Arial`;
        ctx.textAlign = data.caption.alignment;
        ctx.textBaseline = 'top';
        wrapText(ctx, caption, data.caption.position.x, data.caption.position.y, data.caption.max_characters_per_line);

        const gap = 60;
        const logoImg = new Image();
        logoImg.src = 'https://copilot.microsoft.com/images/blob?bcid=r7LcfIwLKPcGCA';
        logoImg.onload = () => {
            const logoWidth = logoImg.width * 1.5;
            const logoHeight = logoImg.height * 1.5;
            ctx.drawImage(logoImg, data.caption.position.x + ctx.measureText(caption).width + gap, data.caption.position.y, logoWidth, logoHeight);
        };

        const ctaWidth = 180;
        const ctaHeight = 60;
        const borderRadius = 10;
        ctx.fillRect(data.cta.position.x, data.cta.position.y, ctaWidth, ctaHeight, borderRadius)
        ctx.fillStyle = data.cta.background_color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${data.cta.font_size || 30}px Arial`;
        ctx.fillText(ctaText, data.cta.position.x + ctaWidth / 2, data.cta.position.y + ctaHeight / 2);

    }, [caption, ctaText, backgroundColor, selectedImage])

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleCtaTextChange = (e) => {
        setCtaText(e.target.value);
    };

    const handleImageUpload = (event) => {
        setLoading(true);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            setSelectedImage(e.target.result);
            setLoading(false);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleColorButtonClick = (color) => {
        setBackgroundColor(color);
    };

    const handlePickerButtonClick = () => {
        setShowPicker(!showPicker);
    };

    const handleBackgroundColorChange = (color) => {
        const newColor = color.hex;
        setBackgroundColor(newColor)
        if (!recentColors.includes(newColor)) {
            setRecentColors([newColor, ...recentColors.slice(0, 4)]);
        }
    }

    const gridStyle = {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
    };

    return (
        <>
            <div className="flex flex-col md:flex-row justify-evenly mt-10 p-4">
                <canvas ref={canvasRef} height={1080} width={1080} className="md:mr-10 mb-10 md:mb-0" style={{ width: '90vw', height: '90vw', maxWidth: '400px', maxHeight: '400px' }} />

                <div style={{ padding: "20px" }} className="w-full md:max-w-md lg:max-w-md xl:max-w-md">
                    <h3 className="text-xl font-bold font-sans text-center">Ad customization</h3>
                    <p className='text-md font-sans text-gray-500 text-center mt-4 md:w-96 lg:w-96 xl:w-96'>
                        Customise your ad and get the templates accordingly
                    </p>

                    <div className=" border-[1px] p-[10px] rounded-[10px]  my-[10px] ">
                        <label htmlFor="adImageUpload" className="icon-placeholder">
                            <AddPhotoAlternateIcon color="primary" sx={{ fontSize: 34 }} />
                            <p className=" inline-block">
                                Change the ad Creative image{"    "}
                                <span className=" underline text-blue-700 hover:cursor-pointer hover:text-blue-800">
                                    {"  "} Select File
                                </span>
                            </p>
                        </label>
                        <input
                            id="adImageUpload"
                            type="file"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                    </div>

                    {loading && <p>Loading...</p>}

                    <div className="text-sm font-sans text-gray-500 text-center mt-5" style={gridStyle}>
                        <hr className='mt-2' style={{ border: "1px solid" }} />
                        <p>Edit contents</p>
                        <hr className='mt-2' style={{ border: "1px solid" }} />
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mt-2 mb-2" htmlFor="username">
                            Ad Content
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="content"
                            type="text"
                            value={caption}
                            onChange={handleCaptionChange}
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="ctaInput">
                            CTA
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="ctaInput"
                            type="text"
                            value={ctaText}
                            onChange={handleCtaTextChange}
                        />


                        <div>
                            <label className="block text-gray-700 text-sm font-bold mt-4" htmlFor="backgroundColorInput">
                                Choose your color
                            </label>
                            <div className="flex space-x-2 mt-4 mb-4">
                                {recentColors.map((color, index) => (
                                    <button
                                        key={index}
                                        className="w-6 h-6 rounded-full cursor-pointer"
                                        style={{ backgroundColor: color, marginRight: '4px' }}
                                        onClick={() => handleColorButtonClick(color)}
                                    />
                                ))}
                                <button
                                    className="w-6 h-6 rounded-full cursor-pointer flex items-center justify-center bg-gray-200 hover:bg-gray-300 focus:outline-none"
                                    onClick={handlePickerButtonClick}
                                    style={{ marginRight: '4px' }}
                                >
                                    <FontAwesomeIcon icon={faPlus} />
                                </button>
                            </div>


                            {showPicker && (
                                <ChromePicker
                                    color={backgroundColor}
                                    onChangeComplete={handleBackgroundColorChange}
                                />
                            )}
                        </div>

                    </div>


                </div>
            </div>

        </>

    )
};

export default Canva;
