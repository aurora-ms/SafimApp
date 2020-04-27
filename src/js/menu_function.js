
// method
export function toggleMenu (event) {
    this.classList.toggle('is-active');
    document.querySelector( ".menuppal" ).classList.toggle("is_active");
    document.querySelector( "#princMenu" ).style.opacity =1;
    document.querySelector('main').style.padding="0";
    event.preventDefault();
  }
  
  