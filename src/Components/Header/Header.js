export default class Header {
  init() {
    console.log();
    // eslint-disable-next-line no-undef
    // gapi.load('auth2', () => { });
    const welcome = document.querySelector('.welcome');
    const avatar = document.querySelector('.welcome-avatar');
    const exit = document.querySelector('.signOut');
    const signIn = () => {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signIn().then((googleUser) => {
        const profile = googleUser.getBasicProfile();
        // auth2.state.name = `${profile.getName()}`;
        // auth2.state.imgUrl = `${profile.getImageUrl}`;
        // const { idToken } = googleUser.getAuthResponse();
        // console.log(`ID Token: ${idToken}`);
        welcome.innerHTML = `Hi, ${profile.getName()}`;
        avatar.src = `${profile.getImageUrl()}`;
        avatar.classList.remove('opacity');
        exit.classList.remove('opacity');
        const stateInJSON = JSON.stringify(this.state);
        localStorage.setItem('appState', stateInJSON);
      });
    };
    const signOut = () => {
      const auth2 = window.gapi.auth2.getAuthInstance();
      auth2.signOut().then(() => {
        welcome.innerHTML = '';
        avatar.classList.add('opacity');
        exit.classList.add('opacity');
      });
    };
    const signInButton = document.querySelector('.signInButton');
    const signOutButton = document.querySelector('.signOutButton');

    signInButton.addEventListener('click', signIn);
    signOutButton.addEventListener('click', signOut);
  }
}
