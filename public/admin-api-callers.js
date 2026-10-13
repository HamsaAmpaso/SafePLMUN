const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : "https://safeplmun.onrender.com";
export async function setReportAsFalseAlarmAPICaller(report_id){
    try{
        const response = await fetch(`${API_URL}/admin/reports`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                report_id: report_id
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
          const response3 = await fetch(`${API_URL}/admin/reports`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                report_id: report_id
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
export async function seeAllUsersAPICaller(){
    try{
        const response = await fetch(`${API_URL}/admin/users`, {
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
          const response3 = await fetch(`${API_URL}/admin/users`, {
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
export async function banUserAPICaller(userid){
    try{
        const response = await fetch(`${API_URL}/admin/users`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid: userid
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
          const response3 = await fetch(`${API_URL}/admin/users`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid: userid
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

export async function unbanUserAPICaller(userid){
    try{
        const response = await fetch(`${API_URL}/admin/users/unban`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid: userid
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
          const response3 = await fetch(`${API_URL}/admin/users/unban`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                userid: userid
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
export async function seeAllUSersStatusAPICaller(){
    try{
        const response = await fetch(`${API_URL}/admin/users/status`, {
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
          const response3 = await fetch(`${API_URL}/admin/users/status`, {
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
export async function adminDashboardAPICaller(){
    try{
        const response = await fetch(`${API_URL}/admin/dashboard`, {
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
          const response3 = await fetch(`${API_URL}/admin/dashboard`, {
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