import {useState, useEffect} from 'react';
import AwardItemComponent from './AwardItemComponent';
import { MockAwards } from './MockAwards';

// Define the award type
interface Award {
    id: number;
    group: string;
    img_src: string;
    card_src: string;
    categories: string[];
    results: string[];
    year: string;
}

function AwardsListComponent(): any {
    const baseArray:Award[] = MockAwards
    const [yearFilter, setYearFilter] = useState('');
    const [groupFilter, setGroupFilter] = useState('');
    const [filteredArray, setFilteredArray] = useState<Award[]>([]);

    const [mousePos, setMousePos] = useState({x: 0, y: 0});

    // Filter baseArray depending on selection
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
    
    // Filter on selection change
    useEffect(() => {
        var filtered = filterAwards(yearFilter, groupFilter)
        setFilteredArray([...filtered])
    }, [yearFilter, groupFilter])


    // Mouse position tracking for card, using window eventlistener
    // Propagation effects are weird and confusing so I'd prefer just track the mouse the whole time
    // Then pass the info down to the item, it's not very expensive to do
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

    return (
        <div className='AwardList'>
            <div className='filterHeader'>
                <h1>This is a Mock Webpage⭐</h1>
                <div className='filterContainer'>
                    <h2>Filter 👇</h2>
                    <div className='filter'>
                        <label>
                            <h3>By Year:</h3>
                            <select name="selectedYear" value={yearFilter} onChange={e => setYearFilter(e.target.value)}>
                                <option value="">All</option>
                                <option value="2025">2025</option>
                                <option value="2024">2024</option>
                            </select>
                        </label>
                    </div>
                    <div className='filter'>
                        <label>
                            <h3>By Group:</h3>
                            <select name="selectedGroup" value={groupFilter} onChange={e => setGroupFilter(e.target.value)}>
                                <option value="">All</option>
                                <option value="European Search Awards">European Search Awards</option>
                                <option value="Global Social Media Awards">Global Social Media Awards</option>
                                <option value="Great Place to Work Awards">Great Place to Work Awards</option>
                            </select>
                        </label>
                    </div>
                </div>
            </div>

            { 
            filteredArray.map((award, index) => {
                return(
                    <AwardItemComponent key={index}
                        index={index}
                        id={award.id}
                        group={award.group}
                        img_src={award.img_src}
                        card_src={award.card_src}
                        categories={award.categories}
                        results={award.results}
                        year={award.year}
                        mousePos={mousePos}
                    />
                )})
            }

        </div>
      );
}

export default AwardsListComponent;