import React, { useState } from "react";
//{props.StoreInfo.name.S}
import {
    Card, Button, CardHeader, CardBody, Alert,
    CardTitle
} from 'reactstrap';
import { ListGroup, ListGroupItem, ListGroupItemHeading, ListGroupItemText } from 'reactstrap';

function OrderItem(props) {
    console.log(props.OrderInfo.Items);
    return (
        <ListGroupItem>
            <ListGroupItemHeading>{props.OrderInfo.Date}</ListGroupItemHeading>
            <ListGroupItemText>
                {
                    props.OrderInfo.Items.map(
                        curItem => (<div>[{curItem.Quantity}] {curItem.Item}</div>)
                    )
                }
            </ListGroupItemText>
        </ListGroupItem>
    );
}

export default function StoreCard(props) {
    const contact = JSON.parse(props.StoreInfo.contact.S);
    const orders = JSON.parse(props.StoreInfo.orders.S);
    const [sendCoupon, setSendCoupon] = useState(false);

    console.log(props.contact);

    function handleSendCouponClick() {
        setSendCoupon(true);
    }
    return (
        <div>
            {
                sendCoupon &&
                <Alert className='mt-2' color="success">
                    Coupon Sent!
                  </Alert>
            }
            <Card className='mt-2'>
                <CardHeader>{props.StoreInfo.name.S}</CardHeader>
                <CardBody>
                    <Button onClick={props.clearStore} color="primary">Back</Button>
                    <Button onClick={handleSendCouponClick} className='ml-2' color="success">Send Coupon Email</Button>
                    <CardTitle className='mt-3'>{props.StoreInfo.address.S}</CardTitle>
                    <CardTitle>{contact.firstname} {contact.lastname} ({contact.email})</CardTitle>
                    <ListGroup>
                        {
                            orders.map(
                                curOrder => (<OrderItem OrderInfo={curOrder} />)
                            )
                        }
                    </ListGroup>

                </CardBody>
            </Card>
        </div>
    )
}