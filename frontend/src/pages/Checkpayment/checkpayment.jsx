import React, { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom';
import styles from './checkpayment.module.css';

function CheckPayment() {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("none");
    useEffect(() => {
        (
            async () => {
                try{
                    const data = await fetch(`http://localhost:3000/api/payment/checkpayment?${searchParams.toString()}`);
                    const dataJson = await data.json();
                    console.log(dataJson);
                    if (dataJson.data.vnp_ResponseCode == "00") {
                        // success
                        setStatus("success");
                    } else{
                        // failed
                        setStatus("error");
                    }
                } catch (error) {
                    console.log(error);
                }
            }
        )()
    }, [searchParams]);
  return (
    <>
      <section className={styles.payment}>
        <div className={styles.paymentContainer}>
        <p className={styles.mainTitle}>TOKYO BITES</p>
        {status === "success" && (
          <div className={styles.successContainer}>
            <div className={styles.checkmark}></div>
            <div className={styles.message}>Successfully</div>
            <div>
              <button onClick={() => window.location.href = '/menu'} className={styles.reviewButton}>
                Review Menu
              </button>
            </div>
          </div>
        )}
        {status === "error" && (
          <div className={styles.failContainer}>
            <div className={styles.fail}></div>
            <div className={styles.failMessage}>Transaction Failed</div>
            <div>
              <button onClick={() => window.location.href = '/contact'} className={styles.failButton}>
                Contact
              </button>
              <button onClick={() => window.location.href = '/tablebooking'} className={styles.failButton}>
                Try Again
              </button>
            </div>
          </div>
        )}
        </div>
    </section>
    </>
  )
}

export default CheckPayment