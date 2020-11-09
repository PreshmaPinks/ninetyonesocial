import React, { useEffect, useState } from 'react';
import './Common.css';
import { useSelector, useDispatch } from 'react-redux';

const Payload = () =>{
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector(state => state.payloadData);
    useEffect(()=>
    {
        fetch("https://api.spacexdata.com/v3/payloads")
            .then(function(response){
                if (response.status !== 200){
                    console.log('Looks like there was a problem. Status Code: ' +
                    response.status);
                    return;
                }
                response.json().then(function(data) {
                    dispatch({ type: "PAYLOAD", payload: data })
                    setIsLoaded(true);
                    setError(null);
                });
            })
            .catch(function(err) {
                setIsLoaded(true);
                setError(err);
            });
    }, []);

    return( 
        <div className="container">
            <div>
                <h1 className="heading">Payload</h1>
            </div> 
            {error && <div>Error: {error.message}</div>}
            {(!isLoaded) ? <div>Loading...</div>
            :<table>
                <tbody>
                {
        
                items && items.map(item => (
                    <tr className="row" key={`payload${item.payload_id}`}>
                        <td className="rowOne">{item.customers[0]}</td>
                        <td className="rowOne">{item.manufacturer}</td>
                        <td className="rowOne">{item.nationality}</td>
                        <td className="rowOne">{item.orbit}</td>
                        <td className="rowOne">{item.payload_id}</td>
                        <td className="rowOne">{(item.payload_mass_kg)?item.payload_mass_kg:"N/A"}</td>
                        <td className="rowOne">{(item.payload_mass_lbs)?item.payload_mass_lbs:"N/A"}</td>
                        <td className="rowOne">{item.payload_type}</td>
                        <td className="rowOne">{item.reused.toString()}</td>
                    </tr>
                    ))
                }
                </tbody>
            </table>  
            }
        </div>
    );
}

export default Payload;