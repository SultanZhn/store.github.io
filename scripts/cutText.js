function cutText(description, maxSize) {
    let descritions = document.querySelectorAll(description)

    descritions.forEach(element => {
        let text = element.textContent;

        if(text.length > maxSize) {
            element.textContent = text.slice(0, maxSize) + '...';
        }
    });

}

export {cutText}
