import StatisticsChart from "../../Components/Dashboard/Charts/statistics-chart";
import { statisticsChartsDataAnalitycs } from "../../Data";

export function Analytics(){
    return (
        <>
        <br />
        <br />
         <div className="mb-6 grid grid-cols-1 gap-y-12 gap-x-6 md:grid-cols-2 xl:grid-cols-3">
        {statisticsChartsDataAnalitycs.map((props) => (
          <StatisticsChart //Puesto como any por si da error
            key={props.title}
            {...props}
          />
        ))}
      </div>
        </>
    )
}