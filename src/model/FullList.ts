import ListItem from "./ListItem";

interface List {
    list: ListItem[], 
    load(): void,
    save(): void,
    clearList(): void,
    addItem( itemObj: ListItem ): void,
    removeItem( id: string ): void 
}

export default class FullList implements List {

    static instance : FullList = new FullList()

    private constructor(
        private _List: ListItem[] = [],
    ){}

    get list (): ListItem[] {
        return this._List
    }

    load(): void {
        const storedList : string | null = localStorage.getItem('myList')
        if (typeof storedList !== 'string') return
        const parsedList : {
            _id: string,
            _item: string,
            _checked: boolean
        }[] = JSON.parse(storedList)

        parsedList.forEach(itemObj => {
            const newListItem = new ListItem (itemObj._id, itemObj._item, itemObj._checked)
            FullList.instance.addItem(newListItem)
        })
    }

    save(): void {
        localStorage.setItem('myList', JSON.stringify(this._List))
    }

    clearList(): void {
        this._List = []
        this.save()
    }

    addItem(itemObj: ListItem): void {
        this._List.push(itemObj)
        this.save()
    }

    removeItem(id: string): void {
        this._List = this._List.filter(item => item.id !== id)
        this.save()
    }
}