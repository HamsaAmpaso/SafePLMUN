const API_URL =
    window.location.hostname === "localhost" ||
    window.location.hostname === "127.0.0.1"
        ? "http://localhost:3000"
        : "https://safeplmun.onrender.com";
export async function reportIncidentAPICaller(type, location){
    try{
        const response = await fetch(`${API_URL}/user/reports`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: type,
                location: location
                
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
             const response3 = await fetch(`${API_URL}/user/reports`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                type: type,
                location: location
            
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
export async function getReportsAPICaller(){
    try{
        const response = await fetch(`${API_URL}/user/reports`, {
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
             const response3 = await fetch(`${API_URL}/user/reports`, {
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
export async function markAsSafeAPICaller(report_id){
    try{
        const response = await fetch(`${API_URL}/user/users_status`, {
            method: "POST",
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
             const response3 = await fetch(`${API_URL}/user/users_status`, {
            method: "POST",
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
        console.log(err);
        return {
            success: false
        }
    }
}

export async function getStatusAPICaller(report_id){
    try{
       const response = await fetch(`${API_URL}/user/users_status/allow`, {
        method: "POST",
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
             const response3 = await fetch(`${API_URL}/users_status/allow`, {
        method: "POST",
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
export async function markAsNeedHelpAPICaller(report_id, location, details){
    try{
        const response = await fetch(`${API_URL}/user/users_status/status/need-help`, {
            method: "POST",
            credentials: "include",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify({
                report_id: report_id,
                location: location,
                details: details
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
             const response3 = await fetch(`${API_URL}/user/users_status/status/need-help`, {
            method: "POST",
            credentials: "include",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify({
                report_id: report_id,
                location: location,
                details: details
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
export async function markAsRescuedAPICaller(report_id){
    try{
        const response = await fetch(`${API_URL}/user/users_status`, {
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
             const response3 = await fetch(`${API_URL}/user/users_status`, {
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
export async function getProfileAPICaller(){
    try{
        const response = await fetch(`${API_URL}/user/profile`, {
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
             const response3 = await fetch(`${API_URL}/user/profile`, {
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
export async function finishAccountSetupAPICaller(occupation, program, bio){
    try{
        const response = await fetch(`${API_URL}/user/profile`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                occupation: occupation,
                program: program,
                bio: bio
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
             const response3 = await fetch(`${API_URL}/user/profile`, {
            method: "PATCH",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                occupation: occupation,
                program: program,
                bio: bio
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
export async function searchUserAPICaller(name){
    try{
        const response = await fetch(`${API_URL}/user/users?name=${name}`, {
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
             const response3 = await fetch(`${API_URL}/user/users?name=${name}`, {
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
export async function setUserAsBuddyAPICaller(buddy, name){
    try{
        const response = await fetch(`${API_URL}/user/buddies`, {
            method: "POST",
            credentials: "include",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify({
                buddy: buddy,
                name: name
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
             const response3 = await  fetch(`${API_URL}/user/buddies`, {
            method: "POST",
            credentials: "include",
            headers: {
                 "Content-Type": "application/json"
            },
            body: JSON.stringify({
                buddy: buddy,
                name: name
            })
        });
            const data3 = await response3.json();
            return data3;
          }

       }

       return data;

    }catch(err){
        console.log(err);
        return {
            success: false
        }
    }
}
export async function checkIfAlreadyBuddiesAPICaller(buddyId){
    try{
        const response = await fetch(`${API_URL}/user/buddies/check`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                buddy: buddyId
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
          const response3 = await  fetch(`${API_URL}/user/buddies/check`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                buddy: buddyId
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
export async function unBuddyAPICaller(buddyeId){
    try{
        const response = await fetch(`${API_URL}/user/buddies/unbuddy`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                buddy: buddyeId
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
          const response3 = await  fetch(`${API_URL}/user/buddies/unbuddy`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                buddy: buddyeId
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
export async function visitUserProfileAPICaller(userid){
    try{
      const response = await fetch(`${API_URL}/user/users/profile`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            buddy: userid
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
          const response3 = await  fetch(`${API_URL}/user/users/profile`, {
        method: "POST",
        credentials: "include",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            buddy: userid
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
export async function seeAllBuddiesAPICaller(){
    try{
        const response = await fetch(`${API_URL}/user/buddies`, {
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
          const response3 = await  fetch(`${API_URL}/user/buddies`, {
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
export async function checkOnBuddiesAPICaller(){
    try{
        const response = await fetch(`${API_URL}/user/buddies/status`, {
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
          const response3 = await fetch(`${API_URL}/user/buddies/status`, {
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
export async function getNotificationsAPICaller(){
    try{
        const response = await fetch(`${API_URL}/user/notifications`, {
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
          const response3 = await fetch(`${API_URL}/user/notifications`, {
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
export async function requestMedicAPICaller(location, details, name){
    try{
        const response = await fetch(`${API_URL}/user/medic-requests`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                location: location,
                details: details,
                name: name
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
          const response3 = await fetch(`${API_URL}/user/medic-requests`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                location: location,
                details: details,
                name: name
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
export async function getAllMedicRequestsAPICaller(){
    try{
        const response = await fetch(`${API_URL}/user/requests`, {
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
          const response3 = await fetch(`${API_URL}/user/requests`, {
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

export async function personalDashboardAPICaller(){
    try{
        const response = await fetch(`${API_URL}/user/dashboard`, {
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
          const response3 = await fetch(`${API_URL}/user/dashboard`, {
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
export async function leaderboardAPICaller(){
    try{
        const response = await fetch(`${API_URL}/user/leaderboard`, {
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
          const response3 = await fetch(`${API_URL}/user/leaderboard`, {
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