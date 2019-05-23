export default function ({ $axios, redirect }) {
    $axios.onError(err => {
        const code = parseInt(err.response && err.response.status)
        if (code === 456) {
            redirect('/404?status=456')
        }
    })
}