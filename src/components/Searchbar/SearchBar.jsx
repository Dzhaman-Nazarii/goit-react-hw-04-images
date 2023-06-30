import { useState } from "react";
import css from './Searchbar.module.css'

export default function Searchbar({onSubmit}) {
    const [galleryName, setGalleryName] = useState('')

    const handleChange = event => {
        setGalleryName(event.currentTarget.value.toLowerCase())
    }

    const handleSubmit = event => {
        event.preventDefault()
        if (galleryName.trim() === '') {
            alert('Введіть назву у пошуку')
            return
        }
        onSubmit(galleryName)
        setGalleryName('')
    }

        return (
            <header className={css.Searchbar}>
                <form onSubmit={handleSubmit} className={css.SearchForm}>
                    <button type="submit" className={css.SearchFormButton}>
                        <span className={css.SearchButtonLabel}>Search</span>
                    </button>
                    <input
                         className={css.SearchFormInput}
                        type="text"
                        name="galleryName"
                        value={galleryName }
                        onChange={handleChange}
                        autoComplete="off"
                        autoFocus
                        placeholder="Search images and photos"
                    />
                </form>
            </header>
        )
}