import React, { Component } from 'react'
import './Main.css'

class Main extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
             min: 5,
             sec: 0,
             isStart: false,
             status: 'Pause'
        }
    }

    componentDidMount(){
        this.down()
    }

    handleInputChange = (event) => {
        if(event.target.name === "min"){
            this.setState({
                min: event.target.value
            })
        }else if(event.target.name === "sec"){
            this.setState({
                sec: event.target.value
            })
        }
        
    }
    
    down = () => {
            setInterval(()=>{
                if(this.state.isStart){
                    let prevSec = this.state.sec;
                    let prevMin = this.state.min;
                    
                    
                    prevSec = prevSec - 1;
                if(prevSec < 0 && prevMin >= 0){
                    prevSec = 59;
                    prevMin = prevMin - 1;
                    this.setState({
                        sec: prevSec,
                        min: prevMin
                    })
                }else if(prevSec >= 0 && prevMin >= 0){
                    this.setState({
                        sec: prevSec,
                        min: prevMin
                    })
                }
                else{
                    this.over()
                }
            }
            }, 1000)
        
    }

    start = () => {
        this.setState({
            isStart: true,
            status: "Running..."
        })
    }

    stop = () => {
        this.setState({
            isStart: false,
            status: "Pause"
        })
    }

    reset = ()=>{
        this.setState({
            isStart: false,
            min: 0,
            sec: 0,
            status: "Reset"
        })
    }

    over = ()=>{
        this.setState({
            isStart: false,
            status: "Over!!!",
            min: 0,
            sec: 0,
        })
    }
    
    render() {
        let status = this.state.status
        return (
            <div className="main-content">
                <div className="min-div">
                    <label>Minute</label><br/>
                    <input type="number" 
                    name="min"
                    value={this.state.min} 
                    onChange={this.handleInputChange}></input>
                </div>
                <h1 className="middle">:</h1>
                <div className="sec-div">
                    <label>Sec</label><br/>
                    <input type="number" 
                    name="sec"
                    value={this.state.sec}
                    onChange={this.handleInputChange}></input>
                </div>
                <button className="start-btn"
                onClick={this.start}>Start</button>
                <div>
                <button className="stop-btn"
                onClick={this.stop}>Stop</button>
                <button className="reset-btn"
                onClick={this.reset}>Reset</button>
        
                <div className="over">
                    <h1>{status}</h1>
                </div>

                </div>
        
            </div>
        )
    }
}

export default Main
