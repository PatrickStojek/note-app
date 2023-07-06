
const addButton = document.querySelector('.add-note');
const popup = document.querySelector('.pop-up');
const visible = document.querySelector('.visible');
const container = document.querySelector('.container');
const close = document.querySelector('.fa-times');
const popAdd = document.querySelector('.add-button');

addButton.addEventListener('click', () => {
  visible.style.display = 'block';
  document.querySelector('.add-button').textContent = 'Add Note';
  clearInputFields();
});

close.addEventListener('click', () => {
  visible.style.display = 'none';
  if (document.querySelector('.editing')) {
    document.querySelector('.editing').classList.remove('editing');
  }
});

popAdd.addEventListener('click', () => {
  const title = document.querySelector('.title_input').value;
  const description = document.querySelector('.text-area').value;
  const currentDate = new Date();

  if (title.trim() === '' || description.trim() === '') {
    alert('Please enter a title and description for the note.');
    return;
  }

  // Check if there is an existing note being edited
  const existingNote = document.querySelector('.editing');
  if (existingNote) {
    // Update the existing note
    const noteElement = existingNote.closest('.note');
    updateNoteElement(noteElement, title, description, currentDate);
  } else {
    // Create a new note element
    const noteElement = createNoteElement(title, description, currentDate);
    const container = document.querySelector('.container ');//this is the line which I have just added
    container.appendChild(noteElement);
  }

  // Clear the input fields
  clearInputFields();

  visible.style.display = 'none';
});

function createNoteElement(title, description, date) {
  const noteElement = document.createElement('div');
  noteElement.classList.add('box', 'note');

  noteElement.innerHTML = `
  <h1 class="header">${title}</h1>
    <p class="description">${description}</p>
    <div class="row-footer">
      <span class="date">${date.toDateString()}</span>
      <div class="exclamIcon-box">
        <i class="fas fa-exclamation" style="color: #e0e0e0; display: none; "></i>
      </div>   
      <i class="more fa-solid fa-ellipsis"></i>
      <div class="menu">
        <ul>
          <div class="edit">
            <li>Edit<i class="fas fa-edit"></i></li>
          </div>
          <div class="trash">
            <li>Delete<i class="fas fa-trash"></i></li>
          </div>
        </ul>
      </div>
    </div>
  `;

  // Add click event listener to the new note's ellipsis icon
  const moreIcon = noteElement.querySelector('.more');
  const menu = noteElement.querySelector('.menu');
  const edit = noteElement.querySelector('.edit');
  const deleteButton = noteElement.querySelector('.trash');

  moreIcon.addEventListener('click', () => {
    menu.style.display = 'block';
  });

  edit.addEventListener('click', () => {
    menu.style.display = 'none';
    visible.style.display = 'block';

    // Populate the input fields with existing note values
    document.querySelector('.title_input').value = noteElement.querySelector('.header').textContent;
    document.querySelector('.text-area').value = noteElement.querySelector('.description').textContent;
    document.querySelector('.add-button').textContent = 'Update';
    noteElement.classList.add('editing');
  });

    deleteButton.addEventListener('click', () => {
        container.removeChild(noteElement);
    });

    ///now I want to add the exclam icon to the footer when the mouse is over the footer

    const rowFooter = noteElement.querySelector('.row-footer');

    rowFooter.addEventListener('mouseout', () => {
        const exclamIcon = noteElement.querySelector('.fa-exclamation');
        exclamIcon.style.display = 'none';
    });

    rowFooter.addEventListener('mouseover', () => {
        const exclamIcon = noteElement.querySelector('.fa-exclamation');
        exclamIcon.style.display = 'block';
    });

    

    const exclamIcon = noteElement.querySelector('.fa-exclamation');
    const exclamIconBox = noteElement.querySelector('.exclamIcon-box');
    exclamIconBox.addEventListener('click', (event) => {
        const target = event.target;

        if (target.classList.contains('exclamIcon-box')) {
            const noteElement = target.closest('.note');
            
            /* if (noteElement.classList.contains('yellow-background')) {
                noteElement.classList.remove('yellow-background');
                const lastyellowBackgroundNote = container.querySelector('.yellow-background:last-child');
                container.insertBefore(noteElement, lastyellowBackgroundNote.nextSibling); */
                if (noteElement.classList.contains('yellow-background')) {
                    noteElement.classList.remove('yellow-background');
                    const yellowBackgroundNotes = container.querySelectorAll('.yellow-background');
                    const lastyellowBackgroundNote = yellowBackgroundNotes[yellowBackgroundNotes.length - 1];
                    
                    if (lastyellowBackgroundNote) {
                      container.insertBefore(noteElement, lastyellowBackgroundNote.nextSibling);
                    } else {
                      const firstNoteElement = container.querySelector('.first-note');
                      container.insertBefore(noteElement, firstNoteElement.nextSibling);
                    }

            } else {
                const firstNoteElement = container.querySelector('.first-note');
                container.insertBefore(noteElement, firstNoteElement.nextSibling);
                noteElement.classList.add('yellow-background');
            }
            
        }
    });
    

  return noteElement;
}

function updateNoteElement(noteElement, title, description, date) {
  noteElement.querySelector('.header').textContent = title;
  noteElement.querySelector('.description').textContent = description;
  noteElement.querySelector('.date').textContent = date.toDateString();
  noteElement.classList.remove('editing');
}

function clearInputFields() {
  document.querySelector('.title_input').value = '';
  document.querySelector('.text-area').value = '';
}


container.addEventListener('click', (event) => {
  const target = event.target;

  if (target.classList.contains('fa-trash')) {
    const noteElement = target.closest('.note');
    container.removeChild(noteElement);
  }
});


///hiding the menu when clicked outside
window.addEventListener('click', (event) => {
    const target = event.target;
    if (!target.classList.contains('more')) {
        const menus = document.querySelectorAll('.menu');
        menus.forEach((menu) => {
            menu.style.display = 'none';
        });
    }
});
  
//////now we want to store the notes that we have created in the local storage

window.addEventListener('load', () => {
    const notes = JSON.parse(localStorage.getItem('notes'));
    if (notes) {
        notes.forEach((note) => {
            const noteElement = createNoteElement(note.title, note.description, new Date(note.date));
            container.appendChild(noteElement);
        });
    }
})




window.addEventListener('beforeunload', () => {
    const noteElements = document.querySelectorAll('.note');
    const notes = [];
    noteElements.forEach((noteElement) => {
        notes.push({
            title: noteElement.querySelector('.header').textContent,
            description: noteElement.querySelector('.description').textContent,
            date: noteElement.querySelector('.date').textContent,
        });
    });
    localStorage.setItem('notes', JSON.stringify(notes));
});
