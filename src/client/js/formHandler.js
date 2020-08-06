function handleSubmit(event) {
    event.preventDefault()
    let formText = document.getElementById('analyse-text').value;
    console.log("::: Form Submitted :::")
    fetch(`http://localhost:8081/test?name=${formText}`)
        .then(res => res.json())
        .then(function (res) {
            document.getElementById('results').innerHTML = res.subjectivity;
        })
}
export {
    handleSubmit
}