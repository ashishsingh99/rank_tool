import React from 'react';
import { useSelector } from 'react-redux';

const Keyword = () => {
    const allprojectdata = useSelector((state) => state.allprojectdata);

    return (
        <div>
            <div>
                <h2 className='table_title'>Keywords</h2>
                <table className="table">
                    <thead >
                        <tr>
                            <th scope="col" >
                                Keyword
                            </th>

                            <th scope="col"> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {allprojectdata.length !== 0 ? allprojectdata && allprojectdata.map((project,key) => {
                            return <tr key={key}>
                                <td>{project.keyword}</td>
                                <td className='table-edit'> <i className='fa-solid fa-edit'></i> <i className=" fa-solid fa-trash"></i> </td>

                            </tr>

                        }) : 'loading'
                        }

                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Keyword;