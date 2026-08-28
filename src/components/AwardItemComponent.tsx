
 import {useState, useEffect} from 'react'

function AwardItemComponent(props:any) {
    const [showCard, setShowCard] = useState(false);
    const [cardRotation, setCardRotation] = useState(0)

    useEffect(() => {
        var centre = window.innerWidth / 2
        setCardRotation((centre - props.mousePos.x) / 30)
    }, [props.mousePos.x])

    return ( 
        <div className='AwardItem' onMouseEnter={() => setShowCard(true)} onMouseLeave={() => setShowCard(false)}>
            {/* This is incredibly messy but I've exploded it like this to make reading the properties easier */}
            {/* It's a ternary operator to either show the card or null, if the item is being hovered */}
            {/* Using inline styling to rotate the image proportional to screen size and distance from centre */}
            {/* Values used are magic numbers based on knowing the image sizes because I made them; this won't necessarily work with any image */}
            {showCard ? <div
                className='awardCard'
                style={{
                    position: 'fixed',
                    left: props.mousePos.x - 32,
                    top: props.mousePos.y - 128,
                    transform: `rotate(${-cardRotation}deg)`,
                    pointerEvents: 'none',
                }}>
                <img
                    src={`src/assets/images/${props.card_src}`}
                    alt="Award Image" 
                    width={64}
                />
            </div>
            : null}
            
            {/* Assign props to relevant items  */}
            <div className="AwardItemContainer">
                <div className="AwardImageContainer">
                    <img
                        src={`src/assets/images/${props.img_src}`}
                        alt="Award Image" 
                        width={200}
                    />
                    <h2>{props.group}</h2>
                </div>
                <div className="AwardCategoryContainer">
                    <h5>Category</h5>
                    <ul>
                        {props.categories.map((category:string, index:number) =>
                        <li key={index}>{index + 1}. {category}</li>
                    )}
                    </ul>
                </div>
                <div className="AwardResultsContainer">
                    <h4>Awards</h4>
                    <ul>
                        {props.results.map((result:string, index:number) =>
                        <li key={index}>{index + 1}. {result}</li>
                    )}
                    </ul>
                </div>
                <div className="AwardYearContainer">
                    <h4>{props.year}{props.yearTabStart}</h4>
                </div>
            </div>
        </div>
     );
}

export default AwardItemComponent;