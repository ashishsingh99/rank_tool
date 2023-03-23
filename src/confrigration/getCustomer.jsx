import axios from "axios";
const GetCustomer = () => {
    const email = localStorage.getItem("email");
    var Customerconfig = {
        method: 'get', maxBodyLength: Infinity, url: 'https://api.stripe.com/v1/customers?email=' + email,
        headers: {
            'Authorization': 'Bearer sk_test_51MeFgLSJQEBqYHhMoGG3kxYfcOOgKbt4cc3mLnIL3gpO4vrFEphG7VD5vcuu2Z08o74D1zSDTXTxqLl7ZytDysYz00G1A8HY8c',
            'Content-Type': 'application/x-www-form-urlencoded'
        },
    };
    axios(Customerconfig)
        .then((res) => {
            console.log('customerId', res.data.data)
            if (res.data.data.length !== 0) {
                const cusId = res.data.data[0].id
                localStorage.setItem("customerId", cusId);


                var SubscriptionConfig = {
                    method: 'get', maxBodyLength: Infinity, url: 'https://api.stripe.com/v1/subscriptions',
                    headers: {
                        'Authorization': 'Bearer sk_test_51MeFgLSJQEBqYHhMoGG3kxYfcOOgKbt4cc3mLnIL3gpO4vrFEphG7VD5vcuu2Z08o74D1zSDTXTxqLl7ZytDysYz00G1A8HY8c',
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    data: cusId
                };
                axios(SubscriptionConfig)
                    .then((subcripData) => {
                        const cusProductId = subcripData.data.data[0].plan.product
                        localStorage.setItem("cusProductId", cusProductId)
                        const cusPlanStatus = subcripData.data.data[0].status
                        localStorage.setItem("cusPlanStatus", cusPlanStatus)
                    })


            }
            else {
                localStorage.removeItem("cusPlanStatus")
                localStorage.removeItem("cusProductId")
                localStorage.removeItem("customerId");
                // when user not subscribe to any plan
                localStorage.setItem("userKeywordlimit", 10)
                localStorage.setItem("userProjectlimit", 1)
            }
        })

}

export default GetCustomer;