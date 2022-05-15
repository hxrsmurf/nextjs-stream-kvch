import tmdb from "./components/tmdb"

export default function tv(req,res) {
    const result = tmdb()
    res.status(200).json(
        result
    )
}
