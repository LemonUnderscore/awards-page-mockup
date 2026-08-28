https://lemonunderscore.github.io/awards-page-mockup/

This page was made using the basic Vite + React setup, I've opted for Typescript for the sake of good practice but didn't make much use of it. The majority of boilerplate components and styling have been removed or heavily modified.

Aside from the above, this page uses no additional libraries, all effects are handled through Typescript, React, HTML and CSS.

To setup locally, download the repo and unzip it to your desired location.

Navigate to the unzipped folder in the command line and run the following commands to start a local server:
```
npm install
npm run dev
```

The page loads award data from a list of JSON objects located in src/assets/MockAwards.tsx

This data is parsed into an array by the AwardListComponent, and filtered according to the year, group or combination of the two.

The AwardListComponent also sorts the array, in case the JSON data isn't ordered

```
const baseArray:Award[] = MockAwards
const [yearFilter, setYearFilter] = useState('');
const [groupFilter, setGroupFilter] = useState('');
const [filteredArray, setFilteredArray] = useState<Award[]>([]);

const filterAwards = ( year:string = '', group:string = '') => {
        var filtered: Award[] = baseArray
        if (year != '') {
            filtered = filtered.filter(item => item.year == year)
        }

        if (group != '') {
            filtered = filtered.filter(item => item.group == group)
        }

        // Sort alphabetical, then by year
	     filtered.sort((a, b) => a.group.toLowerCase().localeCompare(b.group.toLowerCase()));

        filtered.sort((a, b) => parseInt(b.year) - parseInt(a.year));

        return filtered
    }
```
```
useEffect(() => {
        var filtered = filterAwards(yearFilter, groupFilter)
        setFilteredArray([...filtered])
    }, [yearFilter, groupFilter])
```

The AwarditemComponent populates itself with the JSON data that's being passed in as props.

The card hovering effect is achieved by using the AwardListComponent to track the pointer position in screen-coordinates. These coordinates are passed to the AwardItemComponents as props to use for positioning the card.

```
useEffect(() => {
    const handleWindowMouseMove = (pos:any) => {
        setMousePos({
            x: pos.clientX,
            y: pos.clientY,
        })};
        
    window.addEventListener('mousemove', handleWindowMouseMove);
    
    return () => {
        window.removeEventListener(
        'mousemove',
        handleWindowMouseMove,
        )}
    }, [])
```

The card is toggled on or off by the OnMouseEnter and OnMouseLeave Events. The card is moved using inline-styling for both position and rotation. 

```
{showCard ? <div className='awardCard'
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
```

The rotation is calculated proportional to the screen width and is recalculated whenever the mouse moves horizontally.

```
useEffect(() => {
        var centre = window.innerWidth / 2
        setCardRotation((centre - props.mousePos.x) / 30)
    }, [props.mousePos.x])
```
