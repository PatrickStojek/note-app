

 const workspaceInput = document.querySelector('.new-workspace');
const workspaceContainer = document.querySelector('.workspace-container');
const workspaceAddBox = document.querySelector('.new-workspace');
const workspacePlusIcon = document.querySelector('.add-btn');
let activeWorkspace = null; // Track the active workspace element

workspaceInput.addEventListener('keydown', function (event) {
  const workspaceHTML = `<div class="workspace-example">
    <span>${workspaceInput.value}</span>
    <div class="minus-icon-container">
    <i class="fa-solid fa-minus"></i>
    </div>
  </div>`;

  if (event.key === 'Enter' && workspaceInput.value.trim() !== '') {
    workspaceAddBox.insertAdjacentHTML('beforebegin', workspaceHTML);
    workspaceInput.value = '';
  } else if (event.key === 'Enter' && workspaceInput.value.trim() === '') {
    alert('Please enter a workspace name');
  }

  const allMinusIcons = document.querySelectorAll('.minus-icon-container');

  allMinusIcons.forEach(minusIcon => {
    minusIcon.addEventListener('click', () => {
      minusIcon.parentElement.remove();
    });
  });

  const allWorkspaces = document.querySelectorAll('.workspace-example');

  allWorkspaces.forEach(workspace => {
    workspace.addEventListener('click', (event) => {
      const target = event.target;
      const clickedWorkspace = target.closest('.workspace-example');
  
      if (activeWorkspace && activeWorkspace !== clickedWorkspace) {
        saveNotesToLocalStorage(activeWorkspace); // Save notes from the previous active workspace
        clearNotes(activeWorkspace); // Clear notes from the previous active workspace
      }
  
      // Remove 'active' class and box shadow from previous workspace
      if (activeWorkspace) {
        activeWorkspace.classList.remove('active');
        activeWorkspace.style.boxShadow = '1px 1px 1px rgba(0,0,0,0.1)';
      }
  
      // Add 'active' class and box shadow to the clicked workspace
      clickedWorkspace.classList.add('active');
      clickedWorkspace.style.boxShadow = '3px 3px 8px rgba(0,0,0,0.4)';
      activeWorkspace = clickedWorkspace; // Update the active workspace
  
      loadNotesFromLocalStorage(activeWorkspace, () => {
        saveNotesToLocalStorage(activeWorkspace); // Call saveNotesToLocalStorage after loading notes
      });
      console.log(loadNotesFromLocalStorage(activeWorkspace, () => {})); // Here is the console.log
    });
  });
});  

function saveNotesToLocalStorage(workspace) {
  const notesContainer = workspace.nextElementSibling;
  const allNotes = notesContainer.querySelectorAll('.note');
  let notes = [];

  allNotes.forEach(note => {
    notes.push({
      id: note.getAttribute('id'),
      content: note.innerText
    });
  });

  if (notes.length > 0) {
    alert('This function is executed');
    localStorage.setItem(`workspace-notes`, JSON.stringify(notes));
    console.log(localStorage.getItem('workspace-notes'));
  } else {
    deleteNotesFromLocalStorage();
  }
}


function loadNotesFromLocalStorage(workspace, callback) {
    const savedNotes = localStorage.getItem(`workspace-notes`);
    const notesContainer = document.querySelector('.container'); // Update the selector to target the specific notes container
  
    // Clear existing notes before loading
    clearNotes(notesContainer); // Pass the notes container instead of the workspace
  
    if (savedNotes) {
      const notes = JSON.parse(savedNotes);
      notes.forEach(note => {
        const noteElement = document.createElement('div');
        noteElement.setAttribute('id', note.id);
        noteElement.classList.add('note');
        noteElement.innerText = note.content;
        notesContainer.appendChild(noteElement);
      });
    }
  
    callback(); // Invoke the callback function after loading notes
  }
   const notesContainer = document.querySelector('.container');   //this is what notes container should represent
  
  function clearNotes(notesContainer) { // Update the parameter to accept the notes container

    const allNotes = notesContainer.querySelectorAll('.note');
    console.log(allNotes);
  
    allNotes.forEach(note => {
      note.remove();
    });
  }
  
  
  function deleteNotesFromLocalStorage() {
    localStorage.removeItem(`workspace-notes`);
  } 
  

