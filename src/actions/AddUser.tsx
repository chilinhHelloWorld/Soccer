import { user as Adduser } from '../interfaces/InterfaceUser'
import { useEffect, useState } from 'react';
import axios from 'axios';
interface IProps {
    user: Adduser[],
    setUser: React.Dispatch<React.SetStateAction<Adduser[]>>
    userEdit: Adduser[]
    onCloseForm:()=>void;
    seteditUser: React.Dispatch<React.SetStateAction<never[]>>
}
const AddUser = ({ user, setUser, userEdit, seteditUser, onCloseForm }: IProps) => {
    const [txtName, settxtName] = useState('');
    const [txtDoB, settxtDob] = useState('');
    const [cbGen, setcbGen] = useState<string | boolean>('');
    const [txtAddress, settxtAddress] = useState('');
    useEffect(() => {
        if (userEdit[0]) {
            settxtName(userEdit[0].Name);
            settxtDob(userEdit[0].BoD);
            setcbGen (userEdit[0].Gender)
            settxtAddress(userEdit[0].Address)
        } else {
            console.log("Fail get information user")
        }
    }, [userEdit])
    const onChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
        settxtName(e.target.value);
    }
    const onChangeDateofbirth = (e: React.ChangeEvent<HTMLInputElement>) => {
        settxtDob(e.target.value);
    }
    const onChangeGender = (e: React.ChangeEvent<HTMLInputElement>) => {
        const gen: string | boolean = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
        setcbGen(gen)
    }
    const onChangeAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
        settxtAddress(e.target.value);
    }
    const onClear = () => {
        onCloseForm();
        seteditUser([])
    }
    const onSave = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        var newUser = {
            name: txtName,
            DoB: txtDoB,
            Gender: cbGen,
            Address: txtAddress,
        }
        if(userEdit[0])
        {
            axios({
                headers: {
                    "x-access-token": "" + localStorage.getItem('accessToken')
                },
                method: 'PUT',
                url: 'http://localhost:5000/update?id=' + userEdit[0].id,
                data: newUser
            }).then(res => {
                axios({
                    headers: {
                        "x-access-token": "" + localStorage.getItem('accessToken')
                    },
                    method: 'GET',
                    url: 'http://localhost:5000/users'
                }).then(ress => {
                    setUser(ress.data.result)
                }).catch(err => {
                    console.log(err)
                })
                onCloseForm();
                
            })
        } else {
            axios({
                headers: {
                    "x-access-token": "" + localStorage.getItem('accessToken')
                },
                method: 'POST',
                url: 'http://localhost:5000/add_user',
                data: newUser
            }).then(res => {
                axios({
                    headers: {
                        "x-access-token": "" + localStorage.getItem('accessToken')
                    },
                    method: 'GET',
                    url: 'http://localhost:5000/users'
                }).then(ress => {
                    setUser(ress.data.result)
                }).catch(err => {
                    console.log(err)
                })
                onCloseForm();
                
            })
        }
        
    }
    return (
        <div>
                <form onSubmit={onSave} className="my-form-save">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <button type="button" className="close" data-dismiss="modal" aria-hidden="true" onClick={onClear}>&times;</button>
                                <h4 className="modal-title titleForm">Add user</h4>
                            </div>
                            <div className="modal-body">
                                <h4 className='titile1'>Full name</h4>
                                <div>
                                    <input
                                        className='inputForm'
                                        name='name'
                                        onChange={onChangeName}
                                        required
                                        value={txtName}
                                    ></input>
                                </div>
                                <h4 className='titile1'>Date of Birth</h4>
                                <div>
                                    <input
                                        type='text'
                                        className='inputForm'
                                        name='dateOfbirth'
                                        onChange={onChangeDateofbirth}
                                        required
                                        value={txtDoB}
                                    ></input>
                                </div>
                                <h4 className='titile1'>Gender</h4>
                                <div>
                                    <div className="checkbox" >
                                        <label className='titile1'>
                                            <input
                                                type="checkbox"
                                                name="gender"
                                                onChange={onChangeGender}
                                                //  value={cbGen}
                                            />
                                            Male
                                        </label>
                                    </div>
                                </div>
                                <h4 className='titile1' >Address</h4>
                                <div>
                                    <input
                                        className='inputForm'
                                        name="address"
                                        onChange={onChangeAddress}
                                        required
                                        value={txtAddress}
                                    ></input>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-default" data-dismiss="modal" onClick={onClear}>Close</button>
                                <button type="submit" className="btn btn-primary" onClick={()=>onClear}>Save</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>


    )
}
export default AddUser;