import axios from "axios";
import { useDispatch } from "react-redux";
import { customer_Subscription, customer_Subs_Email, get_Plans_Details } from "../services/constants";
const GetCustomer = () => {
    const dispatch = useDispatch();

    const email = localStorage.getItem("email");
    var Customerconfig = {
        method: 'get', maxBodyLength: Infinity, url: customer_Subs_Email(email),
        headers: {
            'Authorization': 'Bearer sk_test_51H2uNSGfS0Ul3rZCRn4acGLzFw7c8tjyO4yV38vgEALC65vljPbcAAwC5ZN8pz7lECljFafEURhk3P3Y2KX3e4vT00yKCfAu5Y',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };
    axios(Customerconfig)
        .then((res) => {
            console.log('customerId', res.data.data)
            if (res.data.data.length !== 0) {
                const customerId = res.data.data[0].id

                var SubscriptionConfig = {
                    method: 'get', maxBodyLength: Infinity, url: customer_Subscription(),
                    headers: {
                        'Authorization': 'Bearer sk_test_51H2uNSGfS0Ul3rZCRn4acGLzFw7c8tjyO4yV38vgEALC65vljPbcAAwC5ZN8pz7lECljFafEURhk3P3Y2KX3e4vT00yKCfAu5Y',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: customerId
                };
                axios(SubscriptionConfig)
                    .then((subcripData) => {
                        const cusProductId = subcripData.data.data[0].plan.product

                        const cusPlanStatus = subcripData.data.data[0].status
                        localStorage.setItem("cusPlanStatus", cusPlanStatus)


                        axios.get(get_Plans_Details())
                            .then((res) => {
                                console.log('get plkan details', res.data.data)
                                const data = res.data.data
                                dispatch({ type: "PLANSDETAILS", payload: data });
                                data && data.filter((res) => {
                                    if (res.prod_id === cusProductId) {
                                        dispatch({ type: "USERPROJECTLIMIT", payload: res.proj_len });
                                        dispatch({ type: "USERKEYWORDLIMIT", payload: res.keyword_len });
                                    }
                                })
                            })

                    })
            }
            else {
                // when user not subscribe to any plan
                dispatch({ type: "USERPROJECTLIMIT", payload: 1 });
                dispatch({ type: "USERKEYWORDLIMIT", payload: 10 });
            }
        })

}

export default GetCustomer;