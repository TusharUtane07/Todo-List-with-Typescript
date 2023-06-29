export interface Item {
    id: string,
    item: string,
    checked: boolean
}

export default class ListItem implements Item{

    constructor(
        private _id = '',
        private _item = '',
        private _checked = false
    ){}

    get id(): string{
        return this._id 
    }

    set id(id: string){
        this._id = id
    }

    get item(): string {
        return this._item 
    }

    set (item: string){
        this._item = item
    }

    get checked (): boolean {
        return this._checked
    }

    set checked (checked: boolean){
        this._checked = checked
    }

}

