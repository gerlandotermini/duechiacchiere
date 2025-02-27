// Table of Contents
//
// 1. Utilities
// 2. Back to Top
// 3. Comments
// 4. Menu
// 5. Live Search
// 6. Miscellaneous

window.addEventListener( 'DOMContentLoaded', ( event ) => {
  // 1. Utilities
  // ----------------------------------------------------------------

  // Find all the siblings of a given node
  let getSiblings = ( el, withClass ) => {
    let siblings = []; 

    // If no parent, return no sibling
    if( !el.parentNode ) {
        return siblings;
    }

    // First child of the parent node
    let sibling  = el.parentNode.firstChild;

    // Find siblings
    while ( sibling ) {
        if ( sibling.nodeType === 1 && sibling !== el && ( !withClass || sibling.classList.contains( withClass ) ) ) {
          siblings.push( sibling );
        }

        sibling = sibling.nextSibling;
    }

    return siblings;
  }

  // Function to attach multiple event listeners to an element
  let addMultiEventListener = ( element, listener ) => {
    element.addEventListener( 'click', listener, false );
    element.addEventListener( 'touchstart', listener, { passive: true } ); // Passive listeners: https://web.dev/uses-passive-event-listeners/

    // Prevent touch event from triggering a fake 'click' event
    element.addEventListener( 'touchend', ( event ) => { event.preventDefault(); } );
  }

  // Function to retrieve a cookie's value
  let getCookie = ( name ) => {
    const value = '; ' + document.cookie;
    const parts = value.split( '; ' + name + '=' );

    if ( parts.length === 2 ) {
      return decodeURIComponent( parts.pop().split( ';' ).shift() );
    }

    return '';
  }

  // 2. Back to Top
  // ----------------------------------------------------------------

  // Show/hide back to top button
  const backToTopButton = document.getElementById( 'backtotop' );
  window.onscroll = () => {
    if ( document.body.scrollTop > 600 || document.documentElement.scrollTop > 600 ) {
      backToTopButton.classList.add( 'active' );
    } else {
      backToTopButton.classList.remove( 'active' );
    }
  }

  // 3. Comments
  // ----------------------------------------------------------------

  // Move the comment form closer to the comment someone is replying to
  if ( document.body.classList.contains( 'single' ) ) {
    let showOtherReplyButton = () => {
      let reply_button = document.getElementById( 'restore-reply-button' );
      if ( reply_button !== null ) {
        reply_button.classList.remove( 'visually-hidden' );
        reply_button.removeAttribute( 'id' );
      }
    }

    document.querySelectorAll( '.comment-reply-link' ).forEach( link => {
      addMultiEventListener( link, function( e ) {
        e.preventDefault();

        // If the user had clicked on another reply button, restore its original state
        showOtherReplyButton();

        // Hide the reply button
        e.currentTarget.setAttribute( 'id', 'restore-reply-button' );
        e.currentTarget.classList.add( 'visually-hidden' );

        // Set aside the original reply title
        const replyTitle = document.getElementById( 'reply-title' );
        if ( !replyTitle.hasAttribute( 'data-original-title' ) ) {
          replyTitle.setAttribute( 'data-original-title', replyTitle.textContent );
        }

        // Update the heading
        replyTitle.textContent = e.currentTarget.getAttribute( 'data-replyto' );

        // Set the value of the hidden field for the parent comment
        document.getElementById( 'comment_parent' ).value = e.currentTarget.getAttribute( 'data-commentid' );

        // Reset the button label
        const replyButton = document.getElementById( 'comment-submit' );
        if ( replyButton.hasAttribute( 'data-original-value' ) ) {
          replyButton.value = replyButton.getAttribute( 'data-original-value' );
        }

        // Show the comment field, if hidden by the Like button
        const comment_field = document.getElementById( 'comment' );
        comment_field.style.display = 'block';
        if ( comment_field.value == '[##like##]' ) {
          comment_field.value = '';
        }

        // Show the Like button
        document.getElementById( 'like-comment-reply' ).style.display = 'block';

        // Move the comment form
        e.currentTarget.closest( 'li' ).appendChild( document.getElementById( 'comment-form' ).parentElement );

        // Show the 'cancel' button
        document.getElementById( 'cancel-comment-reply' ).style.display = 'block';

        // Focus on the comment field
        document.getElementById( 'comment' ).focus();
      } );
    } );

    const cancel_comment_reply = document.getElementById( 'cancel-comment-reply' );
    if ( cancel_comment_reply !== null ) {
      addMultiEventListener( cancel_comment_reply, function( e ) {
        e.preventDefault();

        // If the user had clicked on another reply button, restore its original state
        showOtherReplyButton();

        // Hide the 'cancel' button
        document.getElementById( 'cancel-comment-reply' ).style.display = 'none';

        // Reset the heading
        const replyTitle = document.getElementById( 'reply-title' );
        replyTitle.textContent = replyTitle.getAttribute( 'data-original-title' );

        // Reset the button label
        const replyButton = document.getElementById( 'comment-submit' );
        if ( replyButton.hasAttribute( 'data-original-value' ) ) {
          replyButton.value = replyButton.getAttribute( 'data-original-value' );
        }

        // Show the comment field, if hidden by the Like button
        const comment_field = document.getElementById( 'comment' );
        comment_field.style.display = 'block';
        if ( comment_field.value == '[##like##]' ) {
          comment_field.value = '';
        }

        // Show the Like button and avatars
        document.getElementById( 'like-section' ).style.display = 'block';

        // Reset the value of the hidden field for the parent comment
        document.getElementById( 'comment_parent' ).value = 0;

        // Move the form back
        document.getElementById( 'comments' ).appendChild( document.getElementById( 'comment-form' ).parentElement );

        // Focus on the comment field
        document.getElementById( 'comment' ).focus();
      } );
    }

    // Make sure that the comment is not empty
    document.getElementById( 'comment-form' ).addEventListener( 'submit', ( e ) => {
      e.preventDefault();

      let submitForm = true;
      e.target.querySelectorAll( '[required]' ).forEach( node => {
        submitForm = submitForm && ( node.value.trim() != '' );
      } );

      if ( e.target.querySelector( '#email' ) && e.target.querySelector( '#email' ).value.toLowerCase().match( /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ ) == null ) {
        submitForm = false;
      }

      if ( !submitForm ) {
        document.getElementById( 'comment-submit' ).classList.add( 'shake' );
        setTimeout( () => {
          document.getElementById( 'comment-submit' ).classList.remove( 'shake' );
        }, 500 );
      }
      else {
        e.target.submit();
      }
    } );

    // Like button
    const like_comment_reply = document.getElementById( 'like-comment-reply' );
    if ( like_comment_reply !== null ) {
      addMultiEventListener( like_comment_reply, function( e ) {
        e.preventDefault();

        // Add a placeholder value as the comment value
        const comment_field = document.getElementById( 'comment' );
        comment_field.style.display = 'none';
        comment_field.value = '[##like##]';

        // Update the form's look and feel
        const replyTitle = document.getElementById( 'reply-title' );
        if ( !replyTitle.hasAttribute( 'data-original-title' ) ) {
          replyTitle.setAttribute( 'data-original-title', replyTitle.textContent );
        }
        replyTitle.textContent = "Ti è piaciuto questo post? Dimmi chi sei.";

        const replyButton = document.getElementById( 'comment-submit' );
        if ( !replyButton.hasAttribute( 'data-original-value' ) ) {
          replyButton.setAttribute( 'data-original-value', replyButton.value );
        }
        replyButton.value = 'Mi piace';

        // Show the 'cancel' button
        document.getElementById( 'cancel-comment-reply' ).style.display = 'block';

        // Hide the Like button and bring up the form
        document.getElementById( 'like-section' ).style.display = 'none';
        document.getElementById( 'like-section' ).after( document.getElementById( 'comment-form' ).parentElement );

        // Focus the name field
        document.getElementById( 'author' ).focus();
      } );
    }
  }

  // Populate comment fields with cookie values, if available
  if ( typeof( duechiacchiere.COOKIEHASH ) != 'undefined' ) {
    if ( document.getElementById( 'author' ) !== null ) {
      document.getElementById( 'author' ).value = getCookie( 'comment_author_' + duechiacchiere.COOKIEHASH );
    }
    if ( document.getElementById( 'email' ) !== null ) {
      document.getElementById( 'email' ).value = getCookie( 'comment_author_email_' + duechiacchiere.COOKIEHASH );
    }
    if ( document.getElementById( 'url' ) !== null ) {
      document.getElementById( 'url' ).value = getCookie( 'comment_author_url_' + duechiacchiere.COOKIEHASH );
    }
  }

  // 4. Menu
  // ----------------------------------------------------------------

  // Enable the trigger to open and close the menu
  const toolbarMenuButton = document.getElementById( 'mobile-nav-button' );
  const toolbarSearchButton = document.getElementById( 'mobile-search-button' );
  const menuOverlay = document.getElementById( 'menu-overlay' );
  let bodyWidth = 0;

  let toggleMenu = ( e, action ) => {
    if ( e.type != 'touchstart' ) {
      e.preventDefault();
    }

    const menu = document.getElementById( 'primary-menu' );

    if ( menu === null || menuOverlay === null || toolbarMenuButton === null ) {
      return false;
    }

    if ( action == 'close' || toolbarMenuButton.classList.contains( 'active' ) ) {
      menu.classList.remove( 'active' );
      toolbarMenuButton.classList.remove( 'active' );
      toggleOverlay( e, 'hide' );
    }
    else if ( action == 'open' || !toolbarMenuButton.classList.contains( 'active' ) ) {
      toggleSearch( e, 'close', true );
      menu.classList.add( 'active' );
      
      toolbarMenuButton.classList.add( 'active' );
      toggleOverlay( e, 'show' );
    }
  }

  let toggleSearch = ( e, action, fromMenu ) => {
    if ( !fromMenu ) {
      toggleMenu( e, 'close' );
    }

    if ( action == 'close' || toolbarSearchButton.classList.contains( 'active' ) ) {
      toolbarSearchButton.classList.remove( 'active' );

      toggleOverlay( e, 'hide' );

      if ( !fromMenu ) {
        setTimeout( () => {
            if ( !toolbarSearchButton.classList.contains( 'active' ) ) {
              document.getElementById( 'search-form' ).style.zIndex = 'initial';
            }
          },
          1010
        );
      }
      else {
        document.getElementById( 'search-form' ).style.zIndex = 'initial';
      }
    }
    else if ( action == 'open' || !toolbarSearchButton.classList.contains( 'active' ) ) {
      // Let's remember that the search is focused
      toolbarSearchButton.classList.add( 'active' );

      // Scroll to the search field
      document.getElementById( 'search-form' ).style.zIndex = '475';
      document.getElementById( 'search-field' ).focus();
      document.getElementById( 'search-field' ).closest( '.widget' ).scrollIntoView();

      // Show the overlay
      toggleOverlay( e, 'show' );
    }
  }

  let toggleOverlay = ( e, action ) => {
    if ( action == 'hide' ) {
      menuOverlay.classList.remove( 'active' );

      // document.body.style.overflowY = 'visible';
      document.body.style.paddingRight = 0;
    }
    else {
      menuOverlay.classList.add( 'active' );

      // Prevent copy reflow issues when removing overflow-y from body
      bodyWidth = document.documentElement.clientWidth;
      // document.body.style.overflowY = 'hidden';
      document.body.style.paddingRight = ( document.documentElement.clientWidth - bodyWidth ) + 'px';
    }
  }

  // Attach the appropriate event handler to the mobile menu button
  addMultiEventListener( toolbarMenuButton, ( e ) => {
    toggleMenu( e, 'toggle' );
  } );

  // When tapping the search button, let's make sure the navigation is closed
  addMultiEventListener( toolbarSearchButton, ( e ) => {
    toggleSearch( e, 'toggle', false );
  } );

  // Hide the menu when tapping on the overlay. We had to use an actual DIV because we cannot attach event handlers to pseudo elements
  addMultiEventListener( menuOverlay, ( e ) => {
    toggleOverlay( e, 'hide' );
    toggleMenu( e, 'close' );
    toggleSearch( e, 'close', false );
  } );

  // Add elements to open and close the submenus
  document.querySelectorAll( '#primary-menu .menu-item-has-children' ).forEach( item => {    
      // Use Italian grammar to determine which preposition to use
      let room_name = item.childNodes[0].textContent;

      let enter_preposition = 'il ';
      let exit_preposition = 'dal';

      if ( [ 'a', 'e', 'i', 'o', 'u' ].indexOf( room_name.charAt(0) ) != -1 ) { // word starts with a vowel
        enter_preposition = "l'";
        exit_preposition += "l'";
      }
      else if ( room_name.slice(-1) == 'a' ) { // word ends with 'a'
        enter_preposition = 'la ';
        exit_preposition += 'la ';
      }
      else {
        exit_preposition += ' ';
      }

      item.querySelector( 'a' ).setAttribute( 'aria-expanded', 'false' );
      item.querySelector( 'a' ).insertAdjacentHTML( 'afterend', '<a class="svg open-submenu" href="#" aria-expanded="false" aria-haspopup="true"><span class="visually-hidden"> apri il sottomenu per ' + enter_preposition + room_name + '</span></a>' );
      
      if ( parseInt( window.getComputedStyle( document.body, '::before' ).getPropertyValue( 'padding' ) ) === 0 ) {
        item.querySelector( '.sub-menu' ).insertAdjacentHTML( 'afterbegin', '<li class="menu-item"><a class="svg close-submenu" href="#">esci ' + exit_preposition + room_name + '</a></li>' );
      }

      item.addEventListener( 'mouseover', ( e ) => {
        item.querySelectorAll( ':scope > a' ).forEach( link => {
          link.setAttribute( 'aria-expanded', 'true' );
        } );
      } );

      item.addEventListener( 'mouseout', ( e ) => {
        item.querySelectorAll( ':scope > a' ).forEach( link => {
          link.setAttribute( 'aria-expanded', 'false' );
        } );
      } );

      addMultiEventListener( item.querySelector( '.open-submenu' ), ( e ) => {
        if ( e.type != 'touchstart' ) {
          e.preventDefault();
        }

        item.classList.add( 'active' );
        item.querySelectorAll( ':scope > a' ).forEach( link => {
          link.setAttribute( 'aria-expanded', 'true' );
        } );
      } );

      item.querySelectorAll( '.close-submenu' ).forEach( link => {
        addMultiEventListener( link, ( e ) => {
          if ( e.type != 'touchstart' ) {
            e.preventDefault();
          }
          
          item.classList.remove( 'active' );

          item.querySelectorAll( ':scope > a' ).forEach( link => {
            link.setAttribute( 'aria-expanded', 'false' );
          } );

          // On desktop, focus the parent
          if ( parseInt( window.getComputedStyle( document.body, ':before' ).getPropertyValue( 'padding' ) ) === 1 ) {
            item.querySelector( 'a' ).focus();
          }
        } );
      } );
    // }

    // This only applies to the desktop version on the menu (we use a pseudoelement to determine which layout is being displayed)
    if ( parseInt( window.getComputedStyle( document.body, '::before' ).getPropertyValue( 'padding' ) ) === 1 ) {
      let is_sibling_selected = false;
      item.querySelector( '.sub-menu' ).addEventListener( 'focusout', ( e ) => {
        // We need the setTimeout to give time to the browser to focus the next element
        setTimeout( () => {
          is_sibling_selected = false;
          getSiblings( e.target.parentElement ).forEach( ( sibling ) => {
            is_sibling_selected = is_sibling_selected || ( document.activeElement.parentElement === sibling );
          });

          if ( !is_sibling_selected ) {
            item.classList.remove( 'active' );
            item.querySelectorAll( ':scope > a' ).forEach( link => {
              link.setAttribute( 'aria-expanded', 'false' );
            } );
          }
        }, 10);
      } );
    };
  } );

  // Close all the flyouts on Esc key
  document.body.addEventListener( 'keyup', ( e ) => {
    if ( e.key == "Escape" ) {
      document.querySelectorAll( '.menu-item-has-children' ).forEach( item => {
        item.classList.remove( 'active' );
        item.querySelector( '.open-submenu' ).setAttribute( 'aria-expanded', 'false' );
      } );
    }
  });

  // 5. Live Search
  // ----------------------------------------------------------------
  const searchField = document.getElementById( 'search-field' );
  const categoryFilter = document.getElementById( 'search-category');
  const dropdown = document.getElementById( 'live-results' );
  const searchEndpoint = '//' + window.location.hostname + '/wp-json/wp/v2/posts?per_page=20&search=';
  const decoder = document.createElement("textarea");
  let timeoutID = 0;

  searchField.addEventListener( 'input', ( e ) => {
    if ( searchField.value.length < 3 ) {
      return;
    }

    if ( timeoutID != 0 ) {
      clearTimeout( timeoutID );
    }

    timeoutID = setTimeout( () => {
      fetch( searchEndpoint + encodeURIComponent( searchField.value ) + ( categoryFilter != null ? '&categories=' + categoryFilter.value : '' ) )
          .then( response => {
            if ( !response.ok ) {
                throw new Error( 'Network response was not ok' );
            }
            return response.json();
          } )
          .then( data => {
            dropdown.innerHTML = '';

            if ( data.length > 0 ) {
              data.forEach( data => {
                // Little trick to convert HTML entities returned from the endpoint
                decoder.innerHTML = data.title.rendered;

                const item = document.createElement( 'li' );
                const link = document.createElement( 'a' );
                link.href = data.link;
                link.textContent = decoder.value;
                item.appendChild( link );
                dropdown.appendChild( item );
              });
            } else {
              const item = document.createElement( 'li' );
              item.textContent = 'Nessun risultato trovato'
              dropdown.appendChild( item );
            }
            dropdown.style.display = 'block';
            searchField.setAttribute( 'aria-expanded', 'true' );
          } )
          .catch( error => {
            console.error( 'There was a problem with the fetch operation:', error );
          } );
    }, 500);
  });

  // Hide dropdown if user clicks outside of it
  document.addEventListener('click', function(event) {
      if (!dropdown.contains(event.target) && !document.getElementById('search-field').contains(event.target)) {
          dropdown.style.display = 'none';
          searchField.setAttribute( 'aria-expanded', 'false' );
      }
  });

  // 6. Miscellaneous
  // ----------------------------------------------------------------

  // Open external links in a new tab/window
  document.querySelectorAll( '#main-wrapper a' ).forEach( link => {
    if ( link.getAttribute( 'href' ) && link.hostname.indexOf( location.hostname.replace( 'www.', '' ) ) == -1 ) {
      link.target = '_blank';

      if ( !link.querySelector( '.visually-hidden' ) ) {
        link.insertAdjacentHTML( 'beforeend', '<span class="visually-hidden"> (apre una nuova finestra)</span>');
      }

      // See https://codersblock.com/blog/external-links-new-tabs-and-accessibility/
      let linkTypes = ( link.getAttribute( 'rel' ) || '' ).split(' ');
      if ( !linkTypes.includes( 'noopener' ) ) {
        linkTypes.push( 'noopener' );
      }
      link.setAttribute( 'rel', linkTypes.join(' ').trim() );
    }
  });

  // Add link to read today's posts in the past (dynamic because of caching)
  const today = new Date();
  const back_in_time = document.querySelector( '#widget-back-in-time ul' );
  if ( back_in_time ) {
    back_in_time.insertAdjacentHTML( 'beforeend', '<li><a href="/?day=' + String( today.getDate() ) + '&amp;monthnum=' + String( today.getMonth() + 1 ) + '&amp;year=0" rel="nofollow">Oggi nel passato</a></li>' );
  }
} );