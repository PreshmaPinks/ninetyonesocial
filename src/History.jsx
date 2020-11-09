import React, { useEffect, useState } from 'react';
import './Common.css';
import { useSelector, useDispatch } from 'react-redux';

const History = () =>{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector(state => state.historyData);
    useEffect(()=>
    { 
        fetch("https://api.spacexdata.com/v3/history")
            .then(function(response){
                if (response.status !== 200){
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    return;
                }
                response.json().then(function(data) {
                    dispatch({ type: "HISTORY", payload: data })
                    setIsLoaded(true);
                    setError(null);
                });
            })
            .catch(function(err) {
                setIsLoaded(true);
                setError(error);
            });
    }, []);

    return( 
        <div className="container">
            <div>
                <h1 className="heading">History</h1>
            </div> 
            {error && <div>Error: {error.message}</div>}
            {(!isLoaded) ? <div>Loading...</div>
            :<table>
                <tbody>
                {
        
                items && items.map(item => (
                    <tr className="row" key={`history${item.id}`}>
                        <td className="rowOne">{item.details}</td>
                        <td className="rowOne">{item.event_date_utc}</td>
                        <td className="rowOne">{item.flight_number}</td>
                        <td className="rowOne">{item.id}</td>
                        <td className="rowOne">
                            <a href={item.links.article}>Article</a><br/>
                            {(item.links.reddit)?<a href={item.links.reddit}>Reddit</a>:""}
                            <a href={item.links.wikipedia}>Wikipedia</a>
                        </td>
                        <td className="rowOne">{item.title}</td>  
                    </tr>
                    ))
                }
                </tbody>
            </table>  
            }
        </div>
    );
}

export default History;
