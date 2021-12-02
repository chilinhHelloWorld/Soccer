import React, { useState} from 'react';

interface onSearchProps {
    onSearch: (keyword:string) => void;
}

const SearchUser = ({onSearch}: onSearchProps) => {
    const [keyword, setKeyword] = useState('');
    // const onSearch = (keyword:string) => {
    //     onSearch(keyword);
    //     console.log('onSearch', keyword);
    // }

    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setKeyword(event.target.value);
    };
    return (
        <div>
            <div className="input-group searchI">
                <input
                    type="text"
                    className="form-control "
                    placeholder="Nhập từ khóa..."
                    name="keyword" value={keyword}
                    onChange={onChange}
                />
                <span className="input-group-btn">
                    <button
                        className="btn btn-primary"
                        type="button"
                        onClick={() => onSearch(keyword)}
                    >
                        <span className="fa fa-search mr-5"></span> Search
                    </button>
                </span>
            </div>

        </div>
    )
}
export default SearchUser;