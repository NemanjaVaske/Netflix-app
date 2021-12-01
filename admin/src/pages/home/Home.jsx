import Chart from '../../components/chart/Chart';
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo';
import './home.css';
import WidgetSm from '../../components/widgetSm/WidgetSm';
import WidgetLg from '../../components/widgetLg/WidgetLg';
import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';

const Home = () => {
    const MONTHS =useMemo(()=> ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],[]);

    const [userStats, setUserStats] = useState([]);
    //fetching users statistic to show in diagram
    useEffect(()=>{
        const getUserStats = async()=>{
            try {
                const res = await axios.get("http://localhost:8800/api/users/stats");
                const statsList = res.data.sort((a,b)=>a._id-b._id);
                statsList.map((item)=>setUserStats((prev)=> [...prev, { name: MONTHS[item._id - 1], "New User": item.total}]));
            } catch (error) {
                console.log(error);
            }
        }
        getUserStats();
    },[MONTHS]);

    return (
        <div className="home">
            <FeaturedInfo/>
            <Chart data={userStats} title="User Analitics" dataKey="New User"/>
            <div className="homeWidgets">
                <WidgetSm/>
                <WidgetLg/>
            </div>
        </div>
    );
}

export default Home;
