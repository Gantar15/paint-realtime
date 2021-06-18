
export function saveScreen(canvas, id){
    fetch(`http://localhost:5000/image?id=${id}`, {
        method: 'post',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            img: canvas.toDataURL()
        })
    }).then(resp => resp.json()).
    then(data => console.log(data.message)).
    catch(err => console.warn(err));
}

export * from './constants';