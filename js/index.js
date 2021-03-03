class Tag{
    constructor(value){
        this.value = value;
    }

    createTag(){
        let tag = document.createElement('li');
        tag.classList.add('tags__item');
        tag.innerHTML = `
            <span>${this.value}</span>
            <img src="remove.svg" alt="remove" class="tags__remove">`;
        return tag;
    }
}

class List{
    constructor(tagsInput, tagsContainer, readonlyIndicator){
        this.tagsInput = tagsInput;
        this.tagsContainer = tagsContainer;
        this.tagsList = JSON.parse(localStorage.getItem("taskList")) || [];
        this.renderTags();
        this.readOnly = false;
        this.readonlyIndicator = readonlyIndicator;
    }

    renderTags(){
        this.tagsList.forEach((value) => {
            let tag = new Tag(value);
            this.tagsContainer.append(tag.createTag());
        });
    }

    setToLocalstorage(){
        localStorage.setItem('taskList', JSON.stringify(this.tagsList));
    }

    addTag(){
        if(this.tagsInput.value.trim() !== '' && !this.readOnly){
            let tag = new Tag(this.tagsInput.value);
            this.tagsList.push(this.tagsInput.value);
            this.tagsContainer.append(tag.createTag());
            this.setToLocalstorage(this.tagsList);
            this.tagsInput.value = '';
        }
    }

    removeTag(target){
        if(target.classList.contains('tags__remove') && !this.readOnly){
            let li = target.parentElement;
            let index = [...li.parentElement.children].indexOf(li);
            this.tagsList.splice(index, 1);
            this.setToLocalstorage();
            li.remove();
        }
    }

    toggleReadOnly(){
        this.readOnly = !this.readOnly;
        this.readonlyIndicator.innerText = this.readOnly ? 'On' : 'Off';
    }

    getTags(){
        return this.tagsList;
    }

    setTags(array){
        if(Array.isArray(array)){
            this.tagsList = array;
            this.setToLocalstorage();
        } else {
            console.log('Not array');
        }
    }  
}

const input = document.querySelector('.add__input'),
      addBtn = document.querySelector('.add__button'),
      tagsContainer = document.querySelector('.tags'),
      readOnlyBtn = document.querySelector('.add__readonly'),
      readonlyIndicator = document.querySelector('.mode__indicator');

const list = new List(input, tagsContainer, readonlyIndicator);

addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    list.addTag();
});

tagsContainer.addEventListener('click', e => {
    list.removeTag(e.target);
});

readOnlyBtn.addEventListener('click', () => {
    list.toggleReadOnly();
});

