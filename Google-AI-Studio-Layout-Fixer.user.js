// ==UserScript==
// @name         Google AI Studio - Preview Resizable (Build)
// @namespace    http://tampermonkey.net
// @version      3.0
// @description  Rend la preview de droite redimensionnable à la souris via le séparateur officiel
// @author       Kfayyy
// @match        *://://google.com*
// @include      /https:\/\/aistudio\.google\.com\/apps\/.*/
// @grant        none
// @run-at       document-start
// @license      MIT
// ==/UserScript==

(function() {
    'use strict';

    // Largeur par défaut au premier chargement de la page
    let largeurPreviewActuelle = 450;
    let isDragging = false;

    // 1. Applique les dimensions calculées ou dynamiques
    function forceLayoutProportions() {
        const leftPanel = document.querySelector('div.console-left-panel');
        const splitter = document.querySelector('ms-console-splitter');
        const rightPanel = document.querySelector('div.console-right-panel');
        const mainContainer = leftPanel ? leftPanel.parentElement : null;

        if (mainContainer) {
            mainContainer.style.setProperty('display', 'flex', 'important');
            mainContainer.style.setProperty('justify-content', 'stretch', 'important');
            mainContainer.style.setProperty('width', '100%', 'important');
        }

        if (leftPanel) {
            leftPanel.style.setProperty('flex', '1 1 auto', 'important');
            leftPanel.style.setProperty('width', 'auto', 'important');
            leftPanel.style.setProperty('max-width', 'none', 'important');
        }

        if (splitter) {
            // On change le curseur pour indiquer qu'on peut glisser horizontalement
            splitter.style.setProperty('cursor', 'col-resize', 'important');

            // On s'assure que l'événement mousedown n'est attaché qu'une seule fois
            if (!splitter.dataset.resizerAttached) {
                splitter.dataset.resizerAttached = "true";
                splitter.addEventListener('mousedown', initDrag);
            }
        }

        if (rightPanel) {
            const pxWidth = `${largeurPreviewActuelle}px`;
            rightPanel.style.setProperty('flex', `0 0 ${pxWidth}`, 'important');
            rightPanel.style.setProperty('width', pxWidth, 'important');
            rightPanel.style.setProperty('max-width', pxWidth, 'important');
            rightPanel.style.setProperty('min-width', '250px', 'important');
            rightPanel.style.setProperty('margin-left', 'auto', 'important');
        }
    }

    // 2. Gestionnaires d'événements pour le Drag & Drop
    function initDrag(e) {
        // Empêche la sélection de texte involontaire pendant le glissement
        e.preventDefault();
        isDragging = true;

        document.addEventListener('mousemove', doDrag);
        document.addEventListener('mouseup', stopDrag);

        // Ajoute une classe visuelle globale pour garder le curseur cohérent pendant le mouvement
        document.body.style.setProperty('cursor', 'col-resize', 'important');
    }

    function doDrag(e) {
        if (!isDragging) return;

        // On calcule la nouvelle largeur en fonction de la position de la souris par rapport au bord droit de la fenêtre
        const nouvelleLargeur = window.innerWidth - e.clientX;

        // Limites de sécurité (pas plus petit que 250px et garde au moins 400px pour le chat à gauche)
        if (nouvelleLargeur > 250 && e.clientX > 400) {
            largeurPreviewActuelle = nouvelleLargeur;
            forceLayoutProportions();
        }
    }

    function stopDrag() {
        isDragging = false;
        document.removeEventListener('mousemove', doDrag);
        document.removeEventListener('mouseup', stopDrag);
        document.body.style.removeProperty('cursor');
    }

    // 3. MutationObserver pour contrer le cycle de rendu d'Angular
    const observer = new MutationObserver(() => {
        if (!isDragging) { // Ne pas interférer pendant que l'utilisateur glisse
            forceLayoutProportions();
        }
    });

    const startObserver = () => {
        if (document.body) {
            observer.observe(document.body, {
                attributes: true,
                childList: true,
                subtree: true,
                attributeFilter: ['style', 'class']
            });
            forceLayoutProportions();
        } else {
            setTimeout(startObserver, 50);
        }
    };

    startObserver();
})();
