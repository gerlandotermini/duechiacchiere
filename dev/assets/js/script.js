window.addEventListener( 'load', ( event ) => {
  // WordPress COOKIEHASH (replaced when script is enqueued)
  const duechiacchiere = { 'COOKIEHASH': 'COOKIEHASHVALUE' };

  // Prevent copy reflow issues when removing overflow-y from body
  let bodyWidth = 0;

  // Keyboard-friendly Navigation
  let getSiblings = function( e ) {
    let siblings = []; 

    // If no parent, return no sibling
    if( !e.parentNode ) {
        return siblings;
    }
    
    // First child of the parent node
    let sibling  = e.parentNode.firstChild;
    
    // Find siblings
    while ( sibling ) {
        if ( sibling.nodeType === 1 && sibling !== e ) {
            siblings.push( sibling );
        }
        sibling = sibling.nextSibling;
    }
    return siblings;
  }

  document.querySelectorAll( '#header-container ul.menu > .menu-item > a' ).forEach( link => {
      // Add a 'focus' event handler to each top level link
      link.addEventListener( 'focus', function() {
        // Append a class 'focus' to the parent li
        this.parentElement.classList.add( 'focus' );

        // Change the aria label
        this.setAttribute( 'aria-expanded', 'true' );

        // Remove class and aria label from all the siblings
        getSiblings( this.parentElement ).forEach( sibling => {
          sibling.classList.remove( 'focus' );
          sibling.firstChild.setAttribute( 'aria-expanded', 'false' );
        });
      });
  });

  // Add elements to open and close the submenus
  document.querySelectorAll( '#primary-menu .menu-item-has-children' ).forEach( item => {
    item.querySelector( 'a' ).insertAdjacentHTML( 'afterend', '<a class="open-submenu" href="javascript:;"><span class="visually-hidden">visualizza il menu per questa stanza</span></a>' );
    item.querySelector( '.sub-menu' ).insertAdjacentHTML( 'afterbegin', '<li class="menu-item"><a class="close-submenu" href="javascript:;">esci dalla stanza</a></li>' );
    
    item.querySelector( '.open-submenu' ).addEventListener( 'click', function( e ) { 
      e.preventDefault();
      item.classList.add( 'active' );
    } );

    item.querySelector( '.close-submenu' ).addEventListener( 'click', function( e ) {
      e.preventDefault();
      item.classList.remove( 'active' );
    } );
  } );

  // Enable the trigger to open and close the menu
  const toolbarMenuButton = document.getElementById( 'mobile-nav-button' );
  const menuOverlay = document.getElementById( 'menu-overlay' );

  let toggleMenu = function ( e, action ) {
    const menu = document.getElementById( 'primary-menu' );  

    e.preventDefault();

    if ( action == 'close' ||  toolbarMenuButton.classList.contains ( 'active' ) ) {
      menu.classList.remove( 'active' );
      menuOverlay.classList.remove( 'active' );
      toolbarMenuButton.classList.remove( 'active' );

      document.body.style.overflowY = 'visible';
      document.body.style.paddingRight = 0;
    }
    else if ( action == 'open' || !toolbarMenuButton.classList.contains ( 'active' ) ) {
      menu.classList.add( 'active' );
      menuOverlay.classList.add( 'active' );
      toolbarMenuButton.classList.add( 'active' );

      bodyWidth = document.documentElement.clientWidth;
      document.body.style.overflowY = 'hidden';
      document.body.style.paddingRight = ( document.documentElement.clientWidth - bodyWidth) + 'px';
    }
  }

  toolbarMenuButton.addEventListener( 'click', function( e ) {
    toggleMenu( e, 'toggle' );
  } );

  // Hide the menu when tapping on the overlay
  menuOverlay.addEventListener( 'click', function( e ) {
    toggleMenu( e, 'close' );
  } );

  // When tapping the search button, let's make sure the navigation is closed
  document.getElementById( 'mobile-search-button' ).addEventListener( 'click', function( e ) {
    toggleMenu( e, 'close' );
    document.getElementById( 'search-field' ).focus();
    document.getElementById( 'search-field' ).closest( '.widget' ).scrollIntoView();
  } );

  // Display the comment form under the comment for replies
  form_container = document.querySelector( '#respond' );
  document.querySelectorAll( '.comment-reply-link' ).forEach( link => {
      link.addEventListener( 'click', function( e ) {
          e.preventDefault();
          comment_container = this.closest( '.comment-body' );
          form_container.querySelector( '#reply-title' ).classList.add( 'visually-hidden' );
          form_container.querySelector( '#comment_parent' ).setAttribute( 'value', comment_container.getAttribute( 'id' ).replace(/\D/g, '') );
          comment_container.append( form_container );
          form_container.querySelector( '#comment' ).focus();
      });
  });

  // Open external links in a new tab/window
  document.querySelectorAll( 'a' ).forEach( link => {
    if ( link.getAttribute( 'href' ) && link.hostname !== location.hostname ) {
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
    }
  });

  // Show/hide back to top button
  window.onscroll = function() {
    const backToTopButton = document.getElementById( 'backtotop' );

    if ( document.body.scrollTop > 300 || document.documentElement.scrollTop > 300 ) {
      backToTopButton.style.opacity = 1;
      backToTopButton.style.cursor = 'pointer';
    } else {
      backToTopButton.style.opacity = 0;
      backToTopButton.style.cursor = 'initial';
    }
  }

  // Populate comment fields with cookie values, if available
  let getCookie = function( name ) {
    const value = '; ' + document.cookie;
    const parts = value.split( '; ' + name + '=' );

    if ( parts.length === 2 ) {
      return decodeURIComponent( parts.pop().split( ';' ).shift() );
    }

    return '';
  }
  if ( typeof( duechiacchiere.COOKIEHASH ) != 'undefined' && document.querySelector( '#commentform #author' ) != null ) {
    document.querySelector( '#commentform #author' ).value = getCookie( 'comment_author_' + duechiacchiere.COOKIEHASH );
    document.querySelector( '#commentform #email' ).value = getCookie( 'comment_author_email_' + duechiacchiere.COOKIEHASH );
    document.querySelector( '#commentform #url' ).value = getCookie( 'comment_author_url_' + duechiacchiere.COOKIEHASH );
  }
} );