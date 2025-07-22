import { useState } from "react";
import { Search } from "lucide-react";

function Searchbar1({ onSearch }) {
    const [query, setquery] = useState("");
    const handlechange = (e) => {
        const val = e.target.value;
        console.log(val)
        setquery(val)
        onSearch(val); // Trigger parent callback
    }
    return (
        <div className="flex font-bold items-center w-full max-w-4xl mx-auto my-4">

            <div className="flex-1 flex justify-center">
                <div className="input input-bordered input-error flex items-center gap-2 w-full max-w-xl">
                    <Search className="text-gray-500" size={20} />
                    <input
                        type="text"
                        value={query}
                        onChange={handlechange}
                        placeholder="Search products..."
                        className="grow"
                    />
                </div>
            </div>
        </div>
    )

}
export default Searchbar1