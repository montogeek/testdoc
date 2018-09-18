import React, { Component } from "react"
import { animated } from "react-spring"
import { ReactComponent as UserCheckIcon } from "../../styles/icons/user-check.svg"
import { ReactComponent as ChartIcon } from "../../styles/icons/bar-chart-2.svg"

class Details extends Component {
  render() {
    const { styles, summary } = this.props

    return (
      <animated.div style={styles}>
        <div className="shadow-inner rounded p-4 mt-4 flex flex-row justify-around">
          <div className="mr-8">
            <h2 className="text-lg font-semibold mb-3">
              <UserCheckIcon /> Asistentes confirmados
            </h2>
            <div className="flex flex-col border-l-4 rounded border-orange-lighter pl-2">
              <div className="flex flex-row justify-end">
                <div className="p-3 w-24 text-center">Comida</div>
                <div className="p-3 w-16 text-center">Otros</div>
                <div className="p-3 w-24 text-center">Total</div>
              </div>
              {summary.assistants.map((assistant, i, arr) => {
                const totalStyle = i === arr.length - 1 && "border-t-2 font-medium"
                return (
                  <div key={i} className="flex flex-row hover:bg-orange-lightest">
                    <div className="p-3 pr-4 w-24">{assistant.name}</div>
                    <div className={`p-3 w-24 text-center ${totalStyle}`}>{assistant.count}</div>
                    <div className={`p-3 w-24 text-center ${totalStyle}`}>{assistant.food}</div>
                    <div className={`p-3 w-16 text-center ${totalStyle}`}>{assistant.other}</div>
                    <div className={`p-3 w-24 text-center ${totalStyle}`}>{assistant.total}</div>
                  </div>
                )
              })}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold mb-3">
              <ChartIcon /> Presupuesto
            </h2>
            <div className="flex flex-col border-l-4 rounded border-orange-lighter pl-2">
              <div className="flex flex-row justify-end">
                <div className="p-3 w-24 text-center">Disponible</div>
                <div className="p-3 w-16 text-center">Coste</div>
                <div className="p-3 w-24 text-center">Diferencia</div>
              </div>
              {summary.budget.map((item, i, arr) => {
                const totalStyle = i === arr.length - 1 && "border-t-2 font-medium"

                const diffStyle = item.balance ? "text-green-light" : "text-red-light"

                const diff = item.diff > 0 ? item.diff : `(${Math.abs(item.diff)})`

                return (
                  <div key={i} className="flex flex-row hover:bg-orange-lightest">
                    <div className="p-3 pr-4 w-32">{item.name}</div>
                    <div className={`p-3 w-10 text-center ${totalStyle}`}>{item.count}</div>
                    <div className={`p-3 w-24 text-center ${totalStyle}`}>{item.budget}</div>
                    <div className={`p-3 w-16 text-center ${totalStyle}`}>{item.cost}</div>
                    <div className={`p-3 w-24 text-center ${totalStyle} ${diffStyle}`}>{diff}</div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </animated.div>
    )
  }
}

export default Details
