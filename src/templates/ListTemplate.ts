import FullList from "../model/FullList";

interface DOMList {
    ul: HTMLUListElement,
    clear(): void,
    render(fullList: FullList): void,
}

export default class ListTemplate implements DOMList {

    ul: HTMLUListElement
    
    static instance: ListTemplate = new ListTemplate()

    private constructor(){
        this.ul = document.getElementById('listItems') as HTMLUListElement 
    }

    clear(): void {
        this.ul.innerHTML = ''
    }

    render(fullList: FullList): void {
        this.clear() // I'm clearing everything here at the start because it should not have duplicates.
        
        fullList.list.forEach(element => {
            const li = document.createElement('li') as HTMLLIElement
            li.className = 'item'

            const checkbox = document.createElement('input') as HTMLInputElement
            checkbox.type = 'checkbox'
            checkbox.id = element.id
            checkbox.checked = element.checked
            
            li.append(checkbox)

            checkbox.addEventListener('change', () => {
                element.checked = !element.checked 
                fullList.save()
            })

            const label = document.createElement('label') as HTMLLabelElement
            label.htmlFor = element.id
            label.textContent = element.item
            li.append(label)
            
            const button = document.createElement('button') as HTMLButtonElement
            button.className = 'button'
            button.textContent = 'X'
            li.append(button)

            button.addEventListener('click', () => {
                fullList.removeItem(element.id)
                this.render(fullList)
            })

            this.ul.append(li)
        });
    }
}