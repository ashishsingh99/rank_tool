import axios from "axios";
import { useDispatch } from "react-redux";
import { customer_Subscription, customer_Subs_Email } from "../services/constants";
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

                        // individual Plan Product Id
                        const indMonthID = { id: 'prod_NZthXMecyzOakS', project: 2, keywordLength: 150 }
                        const indAnnualId = { id: 'prod_NZthXMecyzOakS', project: 2, keywordLength: 150 }

                        // Business Plan Product Id
                        const busMonthId = { id: 'prod_NZthXMecyzOakS', project: 5, keywordLength: 300 }
                        const busAnnualId = { id: 'prod_NZthXMecyzOakS', project: 5, keywordLength: 300 }

                        // Enterprice plan Product Id
                        const enterMonthId = { id: 'prod_NZthXMecyzOakS', project: 10, keywordLength: 100000 }
                        const enterAnnualId = { id: 'prod_NZthXMecyzOakS', project: 10, keywordLength: 100000 }


                        if (cusProductId === indMonthID.id) {
                            dispatch({ type: "USERPROJECTLIMIT", payload: indMonthID.project });
                            dispatch({ type: "USERKEYWORDLIMIT", payload: indMonthID.keywordLength });


                        }
                        else if (cusProductId === indAnnualId.id) {
                            dispatch({ type: "USERPROJECTLIMIT", payload: indAnnualId.project });
                            dispatch({ type: "USERKEYWORDLIMIT", payload: indAnnualId.keywordLength });

                        }
                        else if (cusProductId === busMonthId.id) {
                            dispatch({ type: "USERPROJECTLIMIT", payload: busMonthId.project });
                            dispatch({ type: "USERKEYWORDLIMIT", payload: busMonthId.keywordLength });


                        }
                        else if (cusProductId === busAnnualId.id) {
                            dispatch({ type: "USERPROJECTLIMIT", payload: busAnnualId.project });
                            dispatch({ type: "USERKEYWORDLIMIT", payload: busAnnualId.keywordLength });

                        }
                        else if (cusProductId === enterMonthId.id) {
                            dispatch({ type: "USERPROJECTLIMIT", payload: enterMonthId.project });
                            dispatch({ type: "USERKEYWORDLIMIT", payload: enterMonthId.keywordLength });



                        }
                        else if (cusProductId === enterAnnualId.id) {
                            dispatch({ type: "USERPROJECTLIMIT", payload: enterAnnualId.project });
                            dispatch({ type: "USERKEYWORDLIMIT", payload: enterAnnualId.keywordLength });

                        }
                        else {
                            console.log('userProduct not Matched')
                        }

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