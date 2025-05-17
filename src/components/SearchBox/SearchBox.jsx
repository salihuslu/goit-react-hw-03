// src/components/SearchBox/SearchBox.jsx
import styles from './SearchBox.module.css';

export default function SearchBox({ filter, onFilterChange }) {
    return (
        <div className={styles.searchBox}>
            <label>
                Find contacts by name
                <input
                    type="text"
                    value={filter}
                    onChange={(e) => onFilterChange(e.target.value)}
                    className={styles.input}
                />
            </label>
        </div>
    );
}
