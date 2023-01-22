export class AvatarState {
    public refreshCounter: number = 1;

    public constructor() { }

    //TODO make it pub-sub
    public triggerRefresh = () => {
        this.refreshCounter++;
    }

}
