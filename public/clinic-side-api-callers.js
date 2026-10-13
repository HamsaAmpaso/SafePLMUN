const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : "https://eric-s-barbershop-customer-booking-system.onrender.com";
export async function getALLMEdicRequestClinicSideOperatorAPICaller(){
    try{
        const response = await fetch(`${API_URL}/clinic/requests`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
         const data = await response.json();
       if(response.status === 401){
           return {
            forceLogout: true
           }
        }

        if(data.tokenExpired){
          console.log("refreshed");
          const response2 = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
          });

          const data2 = await response2.json();

          if(data2.success){
          const response3 = await fetch(`${API_URL}/clinic/requests`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
            const data3 = await response3.json();
            return data3;
          }

       }

       return data;
    }catch(err){
        return {
            success: false
        }
    }
}
export async function resolveRequestAPICaller(requestId, userId){
    try{
        const response = await fetch(`${API_URL}/clinic/requests`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                requestId: requestId,
                userId: userId
            })
        });

        const data = await response.json();
       if(response.status === 401){
           return {
            forceLogout: true
           }
        }

        if(data.tokenExpired){
          console.log("refreshed");
          const response2 = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
          });

          const data2 = await response2.json();

          if(data2.success){
          const response3 = await fetch(`${API_URL}/clinic/requests`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                requestId: requestId,
                userId: userId
            })
        });
            const data3 = await response3.json();
            return data3;
          }

       }

       return data;
    }catch(err){
         return {
            success: false
        }
    }
}
export async function clinicDashboardAPICaller(){
    try{
        const response = await fetch(`${API_URL}/clinic/dashboard`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
        });
        const data = await response.json();
       if(response.status === 401){
           return {
            forceLogout: true
           }
        }

        if(data.tokenExpired){
          console.log("refreshed");
          const response2 = await fetch(`${API_URL}/auth/refresh`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
          });

          const data2 = await response2.json();

          if(data2.success){
          const response3 = await fetch(`${API_URL}/clinic/dashboard`, {
            method: "GET",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            }
          });
            const data3 = await response3.json();
            return data3;
          }

       }

       return data;
    }catch(err){
        return {
            success: false
        }
    }
}