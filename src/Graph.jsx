import { AreaChart, Area, BarChart, LineChart, Line, XAxis, YAxis, Legend, Tooltip } from "recharts";
import "./styles/graph.css";

const data = [
  { day: "Sun", caught: 5 },
  { day: "Mon", caught: 3 },
  { day: "Tues", caught: 10 },
  { day: "Wed", caught: 4 },
  { day: "Thurs", caught: 12 },
  { day: "Sat", caught: 6 },
];

function Graph() {

    return (
        <div className="graphContainer">
            <h2>Your Weekly Activity</h2>
            <AreaChart style={{ width: '100%', aspectRatio: 1.618, maxWidth: 600 }} responsive data={data}>
                <Area type="monotone" dataKey="caught" stroke="#DC143C" fill="#DC143C" name="Pokémon Caught"/>
                <XAxis dataKey="day"/>
                <YAxis dataKey="caught" />
                <Legend />
                <Tooltip />
            </AreaChart>
        </div>
    )
}

export default Graph;