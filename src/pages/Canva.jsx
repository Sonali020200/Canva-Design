import React, { useEffect, useRef, useState } from 'react';
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

    const Coffeeimage = "https://media.istockphoto.com/id/509141291/photo/coffee-pouring-to-cup.jpg?s=1024x1024&w=is&k=20&c=2K312hvGkuYfbXKUS9ttgYwJCSPIo2jOTEqo59GUsyg=";

    const [caption, setCaption] = useState(data.caption.text);
    const [ctaText, setCtaText] = useState(data.cta.text);
    const [recentColors, setRecentColors] = useState([]);
    const [backgroundColor, setBackgroundColor] = useState('#0369A1');
    const [showPicker, setShowPicker] = useState(false);
    const imageRef = useRef('null');
    const [imageSrc, setImageSrc] = useState(Coffeeimage);
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
        image.src = imageSrc;
        image.onload = () => {
            ctx.drawImage(image, data.image_mask.x + 60, data.image_mask.y + 60, data.image_mask.width - 120, data.image_mask.height - 100);
        }

        ctx.fillStyle = data.caption.text_color;
        ctx.font = `${data.caption.font_size}px Arial`;
        ctx.textAlign = data.caption.alignment;
        ctx.textBaseline = 'top';
        wrapText(ctx, caption, data.caption.position.x, data.caption.position.y, data.caption.max_characters_per_line);

       
        const gap = 60;
        const logoImg = new Image();
        logoImg.src = 'https://upload.wikimedia.org/wikipedia/commons/1/1e/KFC_logo_wordmark.svg';
        logoImg.onload = () => {
            const logoWidth = logoImg.width / 8;
            const logoHeight = logoImg.height / 8;
            ctx.drawImage(logoImg, data.caption.position.x + ctx.measureText(caption).width + gap, data.caption.position.y, logoWidth, logoHeight);
        };

       
        const ctaWidth = 180;
        const ctaHeight = 60;
        ctx.fillRect(data.cta.position.x, data.cta.position.y, ctaWidth, ctaHeight)
        ctx.fillStyle = data.cta.background_color;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = `${data.cta.font_size || 30}px Arial`;
        ctx.fillText(ctaText, data.cta.position.x + ctaWidth / 2, data.cta.position.y + ctaHeight / 2);

    }, [caption, ctaText, backgroundColor, imageSrc])

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleCtaTextChange = (e) => {
        setCtaText(e.target.value);
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    }

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
                    <div className="flex justify-center align-center mt-5">
                    <p className="text-sm font-sans text-gray-500 border rounded-md p-2 border-gray-400 w-full md:max-w-md lg:max-w-md xl:max-w-md">
    Change the ad creative image
</p>

<input className="w-full md:w-80 lg:w-80 xl:w-80" style={{ color: 'blue', marginLeft: '10px' }} type="file" accept="image/*" ref={imageRef} onChange={handleImageChange} />

                    </div>

                    <p className="text-sm font-sans text-gray-500 text-center mt-5" style={gridStyle}>
                        <hr className='mt-2' style={{ border: "1px solid" }} />Edit contents <hr className='mt-2' style={{ border: "1px solid" }} />
                    </p>
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
                            <div className="flex space-x-2 mt-4">
                                {recentColors.map((color, index) => (
                                    <button
                                        key={index}
                                        className="w-4 h-4 rounded-full cursor-pointer"
                                        style={{ backgroundColor: color }}
                                        onClick={() => handleColorButtonClick(color)}
                                    />
                                ))}
                                <button
    className="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center bg-gray-200 hover:bg-gray-300 focus:outline-none"
    onClick={handlePickerButtonClick}
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
