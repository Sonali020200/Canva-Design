import React, { Component } from 'react';
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { ChromePicker } from 'react-color';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

class Canva extends Component {
    constructor(props) {
        super(props);
        this.state = {
            caption: "1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs",
            ctaText: "Shop Now",
            recentColors: [],
            backgroundColor: '#0369A1',
            showPicker: false,
            defaultImage: "https://img.freepik.com/free-photo/cup-coffee-with-heart-drawn-foam_1286-70.jpg?t=st=1714218266~exp=1714221866~hmac=c054219a6e358ca00d3e9b5620693fae0a71766891cbc324a3854b14d73a5b2c&w=740",
            loading: false
        };
        this.canvasRef = React.createRef();
    }

    wrapText = (context, text, x, y, maxCharactersPerLine) => {
        let words = text.split(' ');
        let line = '';
        let lineHeight = 44; // Assuming default font size
        let lines = 1;
        const maxWidth = maxCharactersPerLine * (44 * 0.6); // Assuming default font size

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

    componentDidMount() {
        this.updateCanvas();
    }

    componentDidUpdate() {
        this.updateCanvas();
    }

    updateCanvas() {
        const canvas = this.canvasRef.current;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = this.state.backgroundColor;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Load design pattern image
        const designPatternImg = new Image();
        designPatternImg.src = "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png?random=12345";
        designPatternImg.onload = () => {
            ctx.drawImage(designPatternImg, 0, 0);
        };

        // Load mask image
        const maskImg = new Image();
        maskImg.src = "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png?random=12345";
        maskImg.onload = () => {
            ctx.drawImage(maskImg, 56, 442, 970, 600);
        };

        // Load mask stroke image
        const maskStrokeImg = new Image();
        maskStrokeImg.src = "https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png?random=12345";
        maskStrokeImg.onload = () => {
            ctx.drawImage(maskStrokeImg, 56, 442);
        };

        // Load default image
        const image = new Image();
        image.src = this.state.defaultImage;
        image.onload = () => {
            ctx.drawImage(image, 56, 442, 970, 600);
        };

        // Render caption
        ctx.fillStyle = "#FFFFFF"; // Assuming default text color
        ctx.font = "44px Arial"; // Assuming default font size and style
        ctx.textAlign = "left"; // Assuming default alignment
        ctx.textBaseline = 'top';
        this.wrapText(ctx, this.state.caption, 50, 50, 31); // Assuming default max characters per line

        // Render logo
        const gap = 60;
        const logoImg = new Image();
        logoImg.src = 'https://icon2.cleanpng.com/20180417/trw/kisspng-colonel-sanders-kfc-church-s-chicken-fried-chicken-burger-king-5ad670b0392298.7834946715240029922341.jpg';
        logoImg.onload = () => {
            const logoWidth = logoImg.width / 2;
            const logoHeight = logoImg.height / 2.5;
            ctx.drawImage(logoImg, 50 + ctx.measureText(this.state.caption).width + gap, 50, logoWidth, logoHeight);
        };

        // Render CTA button
        const ctaWidth = 180;
        const ctaHeight = 60;
        const borderRadius = 10;
        ctx.fillRect(190, 320, ctaWidth, ctaHeight, borderRadius);
        ctx.fillStyle = "#000000"; // Assuming default CTA background color
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.font = "30px Arial"; // Assuming default CTA font size and style
        ctx.fillText(this.state.ctaText, 190 + ctaWidth / 2, 320 + ctaHeight / 2);
    }

    handleCaptionChange = (e) => {
        this.setState({ caption: e.target.value });
    };

    handleCtaTextChange = (e) => {
        this.setState({ ctaText: e.target.value });
    };

    handleImageUpload = (event) => {
        this.setState({ loading: true });
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = (e) => {
            this.setState({ defaultImage: e.target.result, loading: false });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    handleColorButtonClick = (color) => {
        this.setState({ backgroundColor: color });
    };

    handlePickerButtonClick = () => {
        this.setState({ showPicker: !this.state.showPicker });
    };

    handleBackgroundColorChange = (color) => {
        const newColor = color.hex;
        this.setState({ backgroundColor: newColor });
        if (!this.state.recentColors.includes(newColor)) {
            this.setState({ recentColors: [newColor, ...this.state.recentColors.slice(0, 4)] });
        }
    }

    render() {
        return (
            <>
                <div className="flex flex-col md:flex-row justify-evenly mt-10 p-4">
                    <canvas ref={this.canvasRef} height={1080} width={1080} className="md:mr-10 mb-10 md:mb-0" style={{ width: '90vw', height: '90vw', maxWidth: '400px', maxHeight: '400px' }} />

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
                                onChange={this.handleImageUpload}
                            />
                        </div>

                        {this.state.loading && <p>Loading...</p>}

                        <div className="text-sm font-sans text-gray-500 text-center mt-5" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
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
                                value={this.state.caption}
                                onChange={this.handleCaptionChange}
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
                                value={this.state.ctaText}
                                onChange={this.handleCtaTextChange}
                            />


                            <div>
                                <label className="block text-gray-700 text-sm font-bold mt-4" htmlFor="backgroundColorInput">
                                    Choose your color
                                </label>
                                <div className="flex space-x-2 mt-4 mb-4">
                                    {this.state.recentColors.map((color, index) => (
                                        <button
                                            key={index}
                                            className="w-6 h-6 rounded-full cursor-pointer"
                                            style={{ backgroundColor: color, marginRight: '4px' }}
                                            onClick={() => this.handleColorButtonClick(color)}
                                        />
                                    ))}
                                    <button
                                        className="w-6 h-6 rounded-full cursor-pointer flex items-center justify-center bg-gray-200 hover:bg-gray-300 focus:outline-none"
                                        onClick={this.handlePickerButtonClick}
                                        style={{ marginRight: '4px' }}
                                    >
                                        <FontAwesomeIcon icon={faPlus} />
                                    </button>
                                </div>


                                {this.state.showPicker && (
                                    <ChromePicker
                                        color={this.state.backgroundColor}
                                        onChangeComplete={this.handleBackgroundColorChange}
                                    />
                                )}
                            </div>

                        </div>


                    </div>
                </div>

            </>

        )
    }
}

export default Canva;
