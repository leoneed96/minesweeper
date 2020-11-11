export default class Timer
{
    constructor(){
    }
    startDateTime: Date | undefined; 
    intervalId: number | undefined;
    elapsed: number = 0;
    public Start() {
        this.startDateTime = new Date();
        this.intervalId = setInterval(() => {
            let currentDate = new Date();
            this.elapsed = (<any>currentDate - <any>this.startDateTime) / 1000;
        }, 1000);
    }
    public Stop(){
        clearInterval(this.intervalId);
        this.elapsed = 0;
        this.startDateTime = undefined;
    }
}